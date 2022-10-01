// const axios = require('axios');

const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
  });
  
const API_KEY = 'live_9vU1zH5wvwihzKOprl7XpQoBpTuLu5eEmYZUiYekMwtjykqGOj8AVrRmXtbqQeZv';
// api.defaults.headers.common['Authorization'] = API_KEY;


// agregamos el default token - le indicamos el auth que nos indica la documentacion de la api 
api.defaults.headers.common['X-API-KEY'] = API_KEY;


const spanError = document.querySelector('.spanError');


// guardamos el params en un array, aplicamos el join '' para que no separe el contenido del array con ','
let queryParams = ['?','limit=3'].join('');

// const URL = `https://api.thecatapi.com/v1/images/search${queryParams}`;
// const URL_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
// const URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
// const URL_UPLOAD_IMAGE = `https://api.thecatapi.com/v1/images/upload`;



async function reload(){

    try{
        const res = await api.get('/images/search',{ params: { limit: 3 } });
      
        const btnFavorites1 = document.querySelector('#btnImg1');
        const btnFavorites2 = document.querySelector('#btnImg2');
        const btnFavorites3 = document.querySelector('#btnImg3');
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
    try {
        const res = await api.delete(`/favourites/${id}`);
        console.log('se efectuo con exito '+res.status);
        loadFavorites();
    } catch (error) {
        console.log('ocurrio un error '+error);
    }
}

async function uploadImg(){
    try {
    // creamos una instancia de FormData y le enviamos el argumento de form 
    // de esta forma FormData guarda todo lo que haya en el formulario
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);
    let imgUp = formData.get('file')
    console.log(imgUp)
       const res = await api.post('/images/upload',
        formData
        )
        addFavorites(res.data.id);
        console.log('se subio con exito '+res.data.id)

    } catch (error) {
        console.log('ocurrio un problema '+error);
    }
    loadFavorites();
}   

reload();