let pokimon = document.getElementById('pokimon'),
    pokimonData = [],
    newContent = JSON.parse(localStorage.getItem('newContent')),
    wrapper = document.getElementById('buttons'),
    filterId = document.getElementById('filter');
   

//fetch API
async function fetchpokimon() {
    debugger
   
   if(newContent != null) {
       displayCards()
      return
   } else {
      for (i = 1; i < 97; i++) {
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
                  type: data.types.map((type)=> type.type.name)
               }
               pokimonData.push(dataContent);
            }
         }  catch (error) {
               console.log(error)
         }    
      }
      localStorage.setItem('newContent', JSON.stringify(pokimonData));
      displayCards()

      return
   }
}
 

let  state = {
      'querySet': newContent != null ? newContent : pokimonData,
      'page': 1,
      'rows': 16,
      'class': 'active'
   };

//trim pokimon array
const trimpokimonArray = (querySet, page, rows) => {
   // debugger
   let trimStart = (page - 1)*rows,
       trimEnd = trimStart + rows,
       trimmedData = querySet.slice(trimStart, trimEnd),
       pages = Math.ceil(querySet.length/rows);

   return  [trimmedData, pages]     
      
}

//display pokimon API on cards
const displayCards = () => {
   pokimonHTMLString = trimpokimonArray(state.querySet, state.page, state.rows)
   let innerDiv = pokimonHTMLString[0],

      pokimonHTML = innerDiv.map(innerDiv => `
                     <li class="card">
                        <img class="card-img" src="${innerDiv.image}"/>
                        <h2 class="card-title">${innerDiv.id}. ${innerDiv.name}</h2>
                        <p class="card-paragraph">${innerDiv.type}</p>
                     </li>
                  `).join('');
   pokimon.innerHTML = pokimonHTML;

   pageButtons()
}

//create pagination button
const pageButtons = (pages) => {
   // debugger
   pages = trimpokimonArray(state.querySet, state.page, state.rows)
   wrapper.innerHTML = ''

   for (let page = 1; page <= pages[1]; page++) {
      let activeClass = state.page == page ? state.class : '';
      wrapper.innerHTML += `<button id="${page}" class="btn ${activeClass}" onclick="changePage(${page})">${page}</button>`;
   }
}

//display pokimon API based on pagination number
const changePage = (val) => {
   // debugger
   state.page = val;
   displayCards()
}

// Implementing Search
const searchBar = document.getElementById('search');

//Search through pokimon cards
const searchCard = () => {
   state.querySet =  newContent != null ? newContent : pokimonData
   let searchParams = searchBar.value.toLowerCase(),
      filteredData = state.querySet.filter((card) => card.name.toLowerCase().includes(searchParams));
      state.querySet = searchParams == '' ?   newContent :  filteredData;
      displayCards()
}

searchBar.addEventListener("keyup", () => {
   searchCard()
});

// Filter pokimon data where filterSearch = filter dropdown value
const filterpokimon = (filterSearch) => {
   // debugger
   state.querySet =  newContent != null ? newContent : pokimonData
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

// call filterpokimon function on select of filter options
filterId.addEventListener('change', () => {filterpokimon(filterId.value) })

fetchpokimon();