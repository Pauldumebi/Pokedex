let pokemon = document.getElementById('pokemon'),
    pokemonData = [],
    newContent = JSON.parse(localStorage.getItem('newContent')),
    wrapper = document.getElementById('buttons'),
    filterId = document.getElementById('filter');
     


//fetch API
async function fetchPokemon() {
   // debugger
   
   if(newContent != null) {
       displayCards()
      return
   } else {
      for (i = 1; i < 151; i++) {
         try {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            response = await fetch(url),
            data = await response.json();
            console.log(data)
           
            if(data != null){
               let dataContent = {
                  name: data.name,
                  id: data.id,
                  image: data.sprites['front_default'],
                  type: data.types.map((type)=> type.type.name).join(', ')
               }
               pokemonData.push(dataContent);
            }
         }  catch (error) {
               console.log(error)
         }    
      }
      localStorage.setItem('newContent', JSON.stringify(pokemonData));
      displayCards()

      return
   }
}
 

let  state = {
      'querySet': newContent != null ? newContent : pokemonData,
      'page': 1,
      'rows': 16,
      'window': 5,
      'class': 'active'
   };

//trim pokemon array
const trimPokemonArray = (querySet, page, rows) => {
   // debugger
   let trimStart = (page - 1)*rows,
      trimEnd = trimStart + rows,
      trimmedData = querySet.slice(trimStart, trimEnd),
      pages = Math.ceil(querySet.length/rows);

   return  [trimmedData, pages]     
      
}

//display pokemon API on card
const displayCards = () => {
   pokemonHTMLString = trimPokemonArray(state.querySet, state.page, state.rows)
   let innerDiv = pokemonHTMLString[0],

      pokemonHTML = innerDiv.map(innerDiv => `
                     <li class="card">
                        <img class="card-img" src="${innerDiv.image}"/>
                        <h2 class="card-title">${innerDiv.id}. ${innerDiv.name}</h2>
                        <p class="card-paragraph">${innerDiv.type}</p>
                     </li>
                  `).join('');
   pokemon.innerHTML = pokemonHTML;

   pageButtons()
}

//create pagination button
const pageButtons = (pages) => {
   // debugger
      pages = trimPokemonArray(state.querySet, state.page, state.rows)
      wrapper.innerHTML = ''

      for (let page = 1; page <= pages[1]; page++) {
         let activeClass = state.page == page ? state.class : '';
         wrapper.innerHTML += `<button id="${page}" class="btn ${activeClass}" onclick="changePage(${page}, this)">${page}</button>`;
      }
}

//display pokemon API based on pagination number
const changePage = (val, e) => {
   // debugger
   state.page = val;
   e.classList.add(state.class);
   displayCards()
}

// Implementing Search
const searchBar = document.getElementById('search');

//Search through pokemon cards
const searchCard = () => {
   state.querySet =  newContent != null ? newContent : pokemonData
   let searchParams = searchBar.value.toLowerCase(),
      filteredData = state.querySet.filter((card) => card.name.toLowerCase().includes(searchParams));
      state.querySet = searchParams == '' ?   newContent :  filteredData;
      displayCards() 
} 

searchBar.addEventListener("keyup", () => { 
   searchCard()
});

// Filter pokemon data where filterSearch = filter dropdown value
const filterPokemon = (filterSearch) => {
   debugger
   state.querySet =  newContent != null ? newContent : pokemonData
   if(filterSearch != 'all'){
      let filterData = state.querySet.filter((data, i)=> { 
      let type = data.type.split(',');
      return type.includes(filterSearch)
      
      })
      state.querySet = filterData;
      displayCards();
      
   }else{
      displayCards();
   }
}

// call filterPokemon function on select of filter options
filterId.addEventListener('change', () => {filterPokemon(filterId.value) })


fetchPokemon();