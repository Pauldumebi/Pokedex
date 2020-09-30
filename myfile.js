let pokimon = []
    pokimonDiv = document.getElementById('pokimon'),

   console.log(pokimon)
//Fetch data
async function fetchPokimon() {
   debugger
   for (let i = 1; i < 8; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      res = await fetch(url),
      data = await res.json()
      
      let dataContent = {
         name: data.name,
         id: data.id,
         image: data.sprites['front_default'],
         type: data.types.map((type) => type.type.name).join(', ')
      }
      pokimon.push(dataContent)
   }
}

//Trim data
let  state = {
      'querySet': pokimon,
      'page': 1,
      'rows': 4,
      'class': 'active'
   };

const trimPokimon = (querySet, rows, page) => {
   let trimStart = (page-1)*rows,
       trimEnd = trimStart + rows,
       trimData = querySet.slice(trimStart, trimEnd),
       pages = Math.ceil(querySet.length/rows)

       return [trimData, pages]
}

const displayPokimon = () => {
   pokimonHTMLSTRING = trimPokimon(state.querySet, state.page, state.rows);

   let innerDiv = pokimonHTMLSTRING[0],
   pokimonHTML = innerDiv.map(innerDiv => `
      <li class="card">
         <img class="card-img" src="${innerDiv.image}"/>
         <h2 class="card-title">${innerDiv.id}. ${innerDiv.name}</h2>
         <p class="card-paragraph">${innerDiv.type}</p>
      </li>
   `).join('');
   console.log(innerDiv)
   pokimonDiv.innerHTML = pokimonHTML;

   console.log(pokimonDiv.innerHTML)

}
displayPokimon()

fetchPokimon()