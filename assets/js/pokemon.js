const btn_exit_pokemon = document.querySelector(".btn-exit-pokemon");
const img = document.querySelector(".img-pokemon");
const nome_pokemon = document.querySelector(".nome-pokemon");
const id_pokemon = document.querySelector(".id-pokemon");
const div_type_pokemon = document.querySelector(".types-pokemon");
const progress_bar = [...document.querySelectorAll(".progress-bar")];
const progress = [...document.querySelectorAll(".progress")];

// Pegar id do pokemon na URL

const id_url_pokemon = new URLSearchParams(window.location.search);
const id = id_url_pokemon.get("id");

const endPoint = `https://pokeapi.co/api/v2/pokemon/`;

btn_exit_pokemon.addEventListener("click", () => {
    history.back();
});

function GET_Pokemon() {
    fetch(endPoint + id)
        .then((response) => {
            if (!response.ok) {
                return new Error("Error no fetch");
            }

            return response.json();
        })
        .then((data) => {
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
                type: data.types.map((element) => {
                    return element;
                }),
            };

            DisplayPokemonContent(pokemon);
        });
}

function DisplayPokemonContent(pokemon) {
    nome_pokemon.innerText = pokemon.nome;
    id_pokemon.innerText = `#${pokemon.id}`;
    img.src = pokemon.img;

    CreatTypePokemonDiv(pokemon.type);
    ProgressBar(pokemon.status);
}

function CreatTypePokemonDiv(type) {
    type.map((element) => {
        const div = document.createElement("div");
        const span = document.createElement("span");

        span.innerText = element.type.name;

        div.appendChild(span);

        div.setAttribute("class", `type ${element.type.name}`);

        div_type_pokemon.appendChild(div);
    });
}

function ProgressBar(status) {
    progress_bar[0].style.width = status[0].base_status + "%";
    progress_bar[1].style.width = status[1].base_status + "%";
    progress_bar[2].style.width = status[2].base_status + "%";
    progress_bar[3].style.width = status[3].base_status + "%";

    progress[0].innerText = status[0].base_status + "%";
    progress[1].innerText = status[1].base_status + "%";
    progress[2].innerText = status[2].base_status + "%";
    progress[3].innerText = status[3].base_status + "%";
}

GET_Pokemon();
