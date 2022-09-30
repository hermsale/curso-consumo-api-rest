// const axios = require('axios');

const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
  });
  
const API_KEY = 'live_9vU1zH5wvwihzKOprl7XpQoBpTuLu5eEmYZUiYekMwtjykqGOj8AVrRmXtbqQeZv';

// agregamos el default token - le indicamos el auth que nos indica la documentacion de la api 
api.defaults.headers.common['X-API-KEY'] = API_KEY;


const spanError = document.querySelector('.spanError');


// guardamos el params en un array, aplicamos el join '' para que no separe el contenido del array con ','
let queryParams = ['?','limit=3'].join('');

const URL = `https://api.thecatapi.com/v1/images/search${queryParams}`;
// const URL_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
const URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const URL_UPLOAD_IMAGE = `https://api.thecatapi.com/v1/images/upload`;

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');



async function reload(){

    try{
        const res = await api.get('/images/search',{ params: { limit: 3 } });
      
        const btnFavorites1 = document.querySelector('#btnFavorites1');
        const btnFavorites2 = document.querySelector('#btnFavorites2');
        const btnFavorites3 = document.querySelector('#btnFavorites3');
        img1.src = res.data[0].url;
        img2.src = res.data[1].url;
        img3.src = res.data[2].url;

        // tenemos que agregar el arrow function para que no se ejecute todos los event onclick
        btnFavorites1.onclick = () => addFavorites(res.data[0].id)
        btnFavorites2.onclick = () => addFavorites(res.data[1].id)
        btnFavorites3.onclick = () => addFavorites(res.data[2].id)

    }catch(err){
        spanError.innerHTML = `<p>Ocurrio un problema</p> `+err;
    }
    
    loadFavorites();
}




async function loadFavorites(){
    const imgFavoritas = document.getElementById('imgFavoritas');
    const imgfav = document.getElementById('imgfav');

    try{
        
        const res = await api.get('/favourites',{ params: { limit: 30 } })
        
        console.log('data URL FAVORITES')
        console.log(res);
    
        // limpiamos el render
        imgFavoritas.innerHTML = '';

        // al limpiar la vista, tenemos que crear todo lo que esta contenia 
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Imagenes Favoritas');
        // h2.value('Imagenes favoritas');
        h2.appendChild(h2Text);
        imgFavoritas.appendChild(h2);
        imgFavoritas.appendChild(imgfav);

        res.data.map(img =>{
            article = document.createElement('article'); 
            article.setAttribute('id','imgfav')
            imgElement = document.createElement('img');
            button = document.createElement('button');
            btnText = document.createTextNode('Retirar imagen');

            imgElement.src = img.image.url;
            button.appendChild(btnText);
            button.onclick = () => deleteFavoriteImg(img.id);
            
            article.appendChild(imgElement);
            article.appendChild(button);

            imgFavoritas.appendChild(article);

        })

        console.log('se resolvio exitosamente');
    
    }catch(err){
        console.log('algo fallo');
        spanError.innerHTML = '<p>Ocurrio un problema</p>'+err;
    }
}

reload();


async function addFavorites(id){
    console.log(id)

    try{
        let data = await api.post('/favourites',{
            image_id:id
        }
        );
        
        
        console.log('esta todo okey '+data.status);
        loadFavorites();
    }catch(error){
        console.log('algo fallo '+error);

        // spanError.innerHTML = 'Ocurrio un problema'+status+data;
    }

}

async function deleteFavoriteImg(id){
    console.log(id);
    const response = await fetch(URL_FAVORITES_DELETE(id),
        {
        method:'DELETE', 
        headers: {
            'X-API-KEY': `${API_KEY}`
        }
    });

    const data = await response.json();

    if(response.status !== 200){
        console.log('algo fallo');
        spanError.innerHTML = 'Ocurrio un problema'+response.status+data.message;
    }else{
        console.log('se borro exitosamente la imagen'); 
        loadFavorites();
    }

}

async function uploadImg(){
    // creamos una instancia de FormData y le enviamos el argumento de form 
    // de esta forma FormData guarda todo lo que haya en el formulario
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    console.log(formData)
    // let imgUp = formData.get('file')
    // console.log(name.name);
    const res = await fetch(URL_UPLOAD_IMAGE,{
        method: 'POST',
        headers: {
            'X-API-KEY': `${API_KEY}`,
            // 'Content-Type': 'multipart/form-data',
        },
        body: formData  
        
    });
    const data = await res.json();

    console.log(data);

    if(res.status!==201){
        console.log('hubo un inconveniente');
        console.log(data.message);
        console.log(res.status);
    }else{
        console.log('la operacion se efectuo exitosamente');
        // agrego a favoritos la imagen
        addFavorites(data.id);
    }
    
    loadFavorites();
}   