function mostrarContenido(opcion){
    const contenedor = document.getElementById("contenido");
    const body = document.getElementById("main-body");

    if(opcion === "inicio"){
        body.classList.add('inicio');
        document.querySelectorAll('.nube').forEach(n => n.style.display = 'none');
        contenedor.innerHTML = `
            <h1 id="api-explorer">API Explorer</h1>
            <p id="main-description">Esta es una aplicación que permite explorar distintas APIs</p>
        `;
    }

    else if(opcion === "clima"){
        document.querySelectorAll('.nube').forEach(n => n.style.display = 'block');

        contenedor.innerHTML = `
        <h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6" id="weather-icon">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>
            Weather App
        </h1>
        <h2 id="weather-subtitle">Ingrese la ciudad</h2>
        <form id="weatherForm">
            <input type="text" id="cityInput" placeholder="Ciudad">
            <button type="submit" id="ingresar">Ingresar <i class="fa-solid fa-location-crosshairs" id="location-icon"></i></button>
            <br><br>
            <fieldset id="resultados">
                <legend id="resultados-legend">Resultados</legend>
            </fieldset>
        </form>
        `;

        const form = document.getElementById("weatherForm");

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            let input = document.getElementById("cityInput");
            let ciudad = input.value;
            try{
                const weather = await mostrarDatosClima(ciudad);
                const fieldset = document.getElementById("resultados");
                fieldset.style.display = "flex";

                const city = weather.location.name;
                const temperature = weather.current.temp_c;
                const humidity = weather.current.humidity;
                const windSpeed = weather.current.wind_kph;
                const clouds = weather.current.cloud;

                const content = `
                    <p class="resultado">Ciudad: ${city}</p>
                    <p class="resultado">Temperatura: ${temperature} °C</p>
                    <p class="resultado">Humedad: ${humidity} %</p>
                    <p class="resultado">Velocidad del viento: ${windSpeed} km/h</p>
                    <p class="resultado">Nubosidad: ${clouds} %</p>
                `;
                fieldset.innerHTML = content;
                input.value = "";
            } catch (error) {
                console.error("Error al mostrar los datos del clima:", error);
                const fieldset = document.getElementById("resultados");
                fieldset.style.display = "flex";
                fieldset.innerHTML = `
                    <p class="resultado">No se encontraron resultados para la ciudad: ${ciudad}</p>
                `;
            }
            form.classList.add('movido');
        });
    }

    else if(opcion === "pais"){
        contenedor.innerHTML = `
            <h1 id="country">GeoData Explorer</h1>
            <h2 id="country-subtitle">Ingrese el nombre de un país</h2>
            <form id="countryForm">
                <input type="text" id="countryInput" placeholder="País">
                <button type="submit" id="searchCountry">Buscar <i class="fa-solid fa-globe"></i></button>
                <br><br>
                <fieldset id="countryResults">
                    <legend id="countryResults-legend">Resultados</legend>
                </fieldset>
            </form>
        `;
        const form = document.getElementById("countryForm");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            let input = document.getElementById("countryInput");
            let pais = input.value;
            try{
                const country = await mostrarDatosPais(pais);
                const countryData = country[0];
                const name = countryData.name.common;
                const capital = countryData.capital ? countryData.capital[0] : "No disponible";
                const region = countryData.region;
                const subregion = countryData.subregion || "No disponible";
                const population = countryData.population.toLocaleString();
                const area = countryData.area.toLocaleString();
                const currencies = countryData.currencies ? Object.values(countryData.currencies).map(c => c.name).join(", ") : "No disponible";
                const languages = countryData.languages ? Object.values(countryData.languages).join(", ") : "No disponible";
                const flag = countryData.flags.svg;

            const fieldset = document.getElementById("countryResults");
            fieldset.style.display = "flex";
            const content = `
                <p class="resultado">Nombre: ${name}</p>
                <p class="resultado">Capital: ${capital}</p>
                <p class="resultado">Región: ${region}</p>
                <p class="resultado">Subregión: ${subregion}</p>
                <p class="resultado">Población: ${population}</p>
                <p class="resultado">Área: ${area} km²</p>
                <p class="resultado">Moneda: ${currencies}</p>
                <p class="resultado">Idiomas: ${languages}</p>
                <img src="${flag}" alt="Bandera de ${name}" class="country-flag">
            `;
            fieldset.innerHTML = content;
            } catch (error) {
                console.error("Error al mostrar los datos del país:", error);
                const fieldset = document.getElementById("countryResults");
                fieldset.style.display = "flex";
                fieldset.innerHTML = `<p class="resultado">No se encontraron datos para el país "${pais}".</p>`;
            }
            form.classList.add('movido');
        });
    }
}


function mostrarDatosPais(pais) {
    return fetch(`https://restcountries.com/v3.1/name/${pais}`)
        .then(response => response.json());
}

function mostrarDatosClima(ciudad) {
    return fetch(`https://api.weatherapi.com/v1/current.json?key=19684e936f004bd6986220407250407&q=${ciudad}&lang=es`)
        .then(response => response.json());
}
