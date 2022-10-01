// // instanciamos axios 
// const axios = require('axios');

// // definimos la url 
// const api = axios.create({
//     baseURL: 'https://api.thecatapi.com/v1/'
// });


const API_KEY = 'live_9vU1zH5wvwihzKOprl7XpQoBpTuLu5eEmYZUiYekMwtjykqGOj8AVrRmXtbqQeZv';
// api.defaults.headers.common['Authorization'] = API_KEY;


const spanError = document.querySelector('.spanError');


// guardamos el params en un array, aplicamos el join '' para que no separe el contenido del array con ','
let queryParams = ['?','limit=3'].join('');

const URL = `https://api.thecatapi.com/v1/images/search${queryParams}&api_key=${API_KEY}`;
const URLFAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=${API_KEY}`
// volvemos funcion a la URL  
const URLFAVORITESDELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');

function addimg1(id){
console.log(id)
// addFavorites(id);
}


async function reload(){
    const response = await fetch(URL);
    const data = await response.json();
    const btnImg1 = document.getElementById('btnImg1');
    const btnImg2 = document.getElementById('btnImg2');
    const btnImg3 = document.getElementById('btnImg3');

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    // escribiendo de esta forma el addEventListener evitamos que se ejecute automaticamente al cargar la funcion 
    btnImg1.addEventListener("click", () => (addFavorites(data[0].id)));
    btnImg2.addEventListener("click", () => (addFavorites(data[1].id)));
    btnImg3.addEventListener("click", () => (addFavorites(data[2].id)));
}   
    // const data = await response.json();
    
reload();
getFavorites();

async function getFavorites(){
    // imgFav = document.querySelector('#imgFav');
    const imgFav = document.getElementById('imgFav');
    const response = await fetch(URLFAVORITES);
    const data = await response.json();

    console.log(data);

    imgFav.innerHTML = '';
    section = document.createElement('section');
    section.setAttribute('id','imgFav');

    h2 = document.createElement('h2');
    h2.innerText = ('Imagenes Favoritas');
    // <h2>Imagenes favoritas</h2>
    imgFav.appendChild(h2);
    
    data.map(elemento => {
        imgFav.innerHTML += `
        <article>
              <img id="img1" src="${elemento.image.url}" alt="Foto gatito aleatorio">
              <button onclick='deleteImg(${elemento.id})'>Retirar imagen de favoritos</button>
            </article>
          </section>
        `
    })

}

async function deleteImg(id){
    console.log('click',id);
    const response = await fetch(URLFAVORITESDELETE(id),{
        method: 'DELETE',
    });
    const data = await response.json();

    if (response.status==200){
        console.log('borrado exitosamente');
        console.log(data);
        getFavorites();
    }else{
        console.log('hubo un inconveniente');
    }
}

async function addFavorites(id){
    console.log(id)

    const response = await fetch(URLFAVORITES,
        {
        method:'POST',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // transforma en JSON para que lo reciba el backend
            image_id : id,
        }
        )
    });
   
    const data = await response.json();
    
    console.log(response.status);
    console.log(data.message);
    if(response.status !== 200){
        console.log('algo fallo');
        spanError.innerHTML = 'Ocurrio un problema'+response.status+data.message;
    }else{
        console.log('esta todo okey');
        getFavorites();
    }

}