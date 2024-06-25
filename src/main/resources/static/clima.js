
function get_coordenadas () {
    const pos = navigator.geolocation.getCurrentPosition(function (pos) {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
  
      get_pronostico(lat, lon)
    });
    console.log("LISTO");
  }
  
  async function get_pronostico(lat, lon) {
    // https://home.openweathermap.org/api_keys 
    const api_key='2bbacf65460d2c5ed9ee4dcfc4d7db27';

    // 1. Creamos la URL con nuestra ubicación actual, y el API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    // 2. Realizamos la consulta a la API de OpenWeather
    const resp = await fetch(url)
    // 3. Desempaquetamos la respuesta obtenida
    const data = await resp.json()
    // 4. Obtenemos la temperatura
    const temperature = data.main.temp - 273;
    // 5. Dibujamos la temperatura en la interfaz
    $('#pronostico').html("En este momento hay una temperatura de " + temperature + "°C")
    console.log(data);
    
  }
  
  get_coordenadas();


  
const llamandoAPI = async () => {
    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        const { results } = await respuesta.json();

        const pokemonesContainer = document.getElementById('pokemonesContainer');

        // Iterar sobre cada pokémon
        for (let pokemon of results) {
            const { name, url } = pokemon;
            const respuestaPokemon = await fetch(url);
            const pokemonData = await respuestaPokemon.json();

            // Obtener la URL de la imagen frontal del Pokémon
            const imagenUrl = pokemonData.sprites.front_default;

            // Crear elemento para mostrar la información del pokémon
            const pokemonDiv = document.createElement('div');
            pokemonDiv.classList.add('pokemon');
            pokemonDiv.innerHTML = `
                <h3>${name}</h3>
                <img src="${imagenUrl}" alt="${name}">
                <p><strong>Primer tipo:</strong> ${pokemonData.types[0].type.name}</p>
            `;
            pokemonesContainer.appendChild(pokemonDiv);
        }

    } catch (error) {
        console.log(error);
    }
}

llamandoAPI();
  

  