const list_pokemon = document.querySelector(".list-pokemon")
const btn_pokemon = document.querySelector(".btn-pokemon")
const btn_display_pokemon = document.querySelector(".btn-display-pokemon")

const endPoint = `https://pokeapi.co/api/v2/pokemon/`

let size = 50
let key_pokemon = 1

function GET_Pokemon() {
    fetch(endPoint + key_pokemon)
    .then(response => {
        if (!response.ok) {
            return new Error("Error no fetch.")
        }

        return response.json()
    })
    .then(data => {
        let pokemon = {
            nome: data.name,
            id: data.id,
            img: data.sprites.front_default,
            status: [
                { base_status: data.stats[0].base_stat },
                { base_status: data.stats[1].base_stat },
                { base_status: data.stats[2].base_stat },
                { base_status: data.stats[5].base_stat },
            ],
            type: data.types.map(element => {
                return element
            }),
        }

        displayPokemon(pokemon)
    })
}

function displayPokemon(pokemon) {
    const li = document.createElement("li")

    li.innerHTML = `
    <section class="img-pokemon">
        <img src="${pokemon.img}" alt="Imagem de um pokemon">
    </section>

    <section class="content-pokemon">
        <h1><span>#${pokemon.id}</span> ${pokemon.nome}</h1>
    </section>

    <section class="button-pokemon">
        <button class="btn-display-pokemon" onclick="LocationPokemon(${pokemon.id})">
            Ver pokemon
        </button>
    </section>
    `

    list_pokemon.appendChild(li)
}

function LocationPokemon(id) {
    window.location = `pokemon.html?id=${id}`
}

const LoadPokemons = () => {
    for (key_pokemon; key_pokemon <= size; key_pokemon++) {
        GET_Pokemon()
    }
}

btn_pokemon.addEventListener("click", () => {
    size += 50
    LoadPokemons()
})

LoadPokemons()