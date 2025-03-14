const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');

const searchpoke = document.querySelector('.form')
const searchinputpoke = document.querySelector('.input_search')
const btPrev = document.querySelector('.btn-prev')
const btNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>
{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>
{
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = 'Carregando...'
    pokemonId.innerHTML = ''

    const data = await fetchPokemon(pokemon);

    if(data){

    pokemonName.innerHTML = data.name
    pokemonId.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id;

}   


else{
    pokemonName.innerHTML = 'Not found';
    pokemonId.innerHTML = ''
    pokemonImage.style.display = 'None'

}

searchinputpoke.value = '';

}

searchpoke.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(searchinputpoke.value.toLowerCase());
} );


btPrev.addEventListener('click', () =>{
    if(searchPokemon >= 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }

});

btNext.addEventListener('click', () =>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
})




renderPokemon(searchPokemon)