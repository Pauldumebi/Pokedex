const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
   const promises = [];
   for (i=1; i<151; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
   }
   Promise.all(promises).then((results) => {
      var pokemon;
         pokemon = results.map((data) => ({
         name: data.name,
         id: data.id,
         image: data.sprites['front_default'],
         type: data.types.map((type)=> type.type.name).join(', ')
      }));
       displayPokemon(pokemon);
   })
}

const displayPokemon = (pokemon) => {
   
   var state = {
      'querySet': pokemon,
      'page': 1,
      'rows': 10
   }
 
   const pagination = (querySet, page, rows) => {
      var trimStart = (page-1)*rows
      var trimEnd = trimStart + rows

      var trimmedData = querySet.slice(trimStart, trimEnd)
      var pages = Math.ceil(querySet.length/rows)

      return {
         'querySet': trimmedData,
         'pages': pageButtons(pages)
      }
      
   }
   function pageButtons(pages) {
      var wrapper = document.getElementById('buttons');
      wrapper.innerHTML = ''
      for (let page = 1; page <= pages; page++) {
         wrapper.innerHTML += `<button class="btn" val=${page}>${page}</button>` ;
         console.log(wrapper.innerHTML)
      }
      
   }
   pageButtons(pokemon.pages)
   
   function buildPagination() {
      pokemonHTMLString = pagination(state.querySet, state.page, state.rows)
      let innerDiv = pokemonHTMLString.querySet;

      var pokemonHTML = innerDiv.map(innerDiv => `
      <li class="card">
         <img class="card-img" src="${innerDiv.image}"/>
         <h2 class="card-title">${innerDiv.id}. ${innerDiv.name}</h2>
         <p class="card-paragraph">${innerDiv.type}</p>
      </li>
   `).join('')
      pokedex.innerHTML = pokemonHTML;
      // return

   }
   buildPagination();

}

fetchPokemon ();


//Implementing the search function 
  
// const searchBar = document.getElementById('search');

// searchBar.addEventListener("keyup", e => { 
//   const searchString = e.target.value.toLowerCase(); 
// });
// const filteredCharacters = hpCharacters.filter(character => {
//   return (
//     character.name.includes(searchString) ||
//     character.house.includes(searchString)
//   );
// });

// searchBar.addEventListener("keyup", e => {
//   const searchString = e.target.value;
//   const filteredCharacters = hpCharacters.filter(character => {
//     return (
//       character.name.includes(searchString) ||
//       character.house.includes(searchString)
//     );
//   });
//   displayCharacters(filteredCharacters);
// });


  




