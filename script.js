

const divClima = document.getElementById("divClima")
const API_KEY = "bfd1b980aa5416c251b43fb2f1ba6c22";







fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Mendoza,Mendoza,Argentina&limit=1&appid=${API_KEY}`)
.then(response => response.json())
.then(data => {
    const {lat, lon, state, country, name} = data[0]

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(({main}) => {
        divClima.innerHTML = `
        <div>    
        <p>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Estado del clima en paso los libertadores
            </button>
          </p>
          <div class="collapse" id="collapseExample">
            <div class="card card-body">
            <h2>Clima en ${name}, ${state}, ${country}</h2>
            <p>Temperatura: ${main.temp} °C </p>
            <p>Sensacion Termica: ${main.feels_like} °C </p>
            <p>Humedad: ${main.humidity}% </p>
            <p>Presion: ${main.pressure} hPa</p>
              Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
            </div>
          </div>

        `
    })
})







const divProductos = document.getElementById("divProductos")
const botonProductos = document.getElementById("botonProductos")
const inputProducto = document.getElementById("inputProducto")

const traerProductos = async () => {
    const response = await fetch('./productos.json')
    const productos = await response.json()
    return productos
}

function mostrarProductos(arrayProductos) {
    arrayProductos.forEach((producto, indice) => {
        divProductos.innerHTML += `
            <div class="card" id="producto${indice}" style="width: 18rem;margin:3px;">
            <img src="./img/${producto.img}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Marca: ${producto.marca}</p>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <p class="card-text">Stock: ${producto.stock}</p>
                    <button class="btn btn-dark">Agregar al carrito</button>
                </div>
            </div>
        
        `
    });

}

inputProducto.addEventListener('input', () => {
    let res = inputProducto.value
   
    traerProductos().then(productos => {
        const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(res.toLowerCase()))
        divProductos.innerHTML = ""
        mostrarProductos(productosFiltrados)
    })
})


botonProductos.addEventListener('click', () => {
    traerProductos().then(productos => {
        mostrarProductos(productos)
    })
})



