import { map, filter } from 'lodash'

const all = document.getElementById('all')
const typeSelector = document.getElementById('type')
const prevPageButton = document.getElementById('prevPage')
const nextPageButton = document.getElementById('nextPage')

let currentPage = 1
const itemsPerPage = 20 // Pokémon par page
let currentTypeFilter = '' // Type de Pokémon actuellement filtré (par défaut, tous les types)

// Récupérer les données des Pokémon
async function getPokemonData (id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// Afficher les Pokémon
function displayPokemon (pokemonData) {
  all.innerHTML = '' // Effacez le contenu précédent
  pokemonData.forEach(pokemon => {
    // Créer div pour chaque Pokémon
    const pokemonDiv = document.createElement('div')
    const typeClass = pokemon.types[0].type.name // Récupérez la classe du type du Pokémon
    pokemonDiv.className = `pokemon-circle type-transition ${typeClass}` // Classe de base pour le cercle Pokémon, classe de transition et classe de type

    // Créer image pour le Pokémon
    const img = document.createElement('img')
    img.src = pokemon.sprites.front_default
    img.alt = pokemon.name

    // Créer nom du Pokémon
    const namePara = document.createElement('h3')
    namePara.textContent = pokemon.name

    // Créer types
    const typePara = document.createElement('p')
    const typeText = pokemon.types.map(type => type.type.name).join(', ')
    typePara.textContent = `${typeText}`

    // Ajouter au conteneur div
    pokemonDiv.appendChild(img)
    pokemonDiv.appendChild(namePara)
    pokemonDiv.appendChild(typePara)

    // Ajoutez le conteneur div au conteneur principal
    all.appendChild(pokemonDiv)
  })
}

// Pagination des Pokémon
function paginatePokemon (pokemonData, page) {
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return pokemonData.slice(startIndex, endIndex)
}

// Filtre Pokémon par type
function filterPokemonByType (pokemonData, type) {
  if (!type) {
    return pokemonData // Retourne tous les Pokémon si aucun type n'est sélectionné
  }
  return filter(pokemonData, pokemon => {
    const types = pokemon.types.map(typeObj => typeObj.type.name)
    return types.includes(type)
  })
}

// Mettre à jour l'affichage des Pokémon
function updatePokemonDisplay () {
  const filteredPokemon = filterPokemonByType(pokemonData, currentTypeFilter)
  const paginatedPokemon = paginatePokemon(filteredPokemon, currentPage)
  displayPokemon(paginatedPokemon)
}

// Page précédente
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--
    updatePokemonDisplay()
  }
})

// Page suivante
nextPageButton.addEventListener('click', () => {
  const totalPages = Math.ceil(filterPokemonByType(pokemonData, currentTypeFilter).length / itemsPerPage)
  if (currentPage < totalPages) {
    currentPage++
    updatePokemonDisplay()
  }
})

// Changement de type
typeSelector.addEventListener('change', () => {
  currentTypeFilter = typeSelector.value
  currentPage = 1 // Réinitialisez la page à 1 lorsque vous changez le filtre
  updatePokemonDisplay()
})

// Données de tous les Pokémon
const pokemonData = await Promise.all(map(Array.from({ length: 200 }, (_, i) => i + 1), getPokemonData))

// Initialisation de l'affichage
updatePokemonDisplay()
