const API_KEY = 'live_9vU1zH5wvwihzKOprl7XpQoBpTuLu5eEmYZUiYekMwtjykqGOj8AVrRmXtbqQeZv';

const spanError = document.querySelector('.spanError');


// guardamos el params en un array, aplicamos el join '' para que no separe el contenido del array con ','
let queryParams = ['?','limit=3'].join('');

const URL = `https://api.thecatapi.com/v1/images/search${queryParams}`;
const URL_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
const URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');



async function reload(){
    const response = await fetch(URL);
    const data = await response.json();
    console.log('data reload')
    console.log(data);

    if(response.status !== 200){
        spanError.innerHTML = `<p>Ocurrio un problema</p>`+response.status;
    }else{
        const btnFavorites1 = document.querySelector('#btnFavorites1');
        const btnFavorites2 = document.querySelector('#btnFavorites2');
        const btnFavorites3 = document.querySelector('#btnFavorites3');
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        // tenemos que agregar el arrow function para que no se ejecute todos los event onclick
        btnFavorites1.onclick = () => addFavorites(data[0].id)
        btnFavorites2.onclick = () => addFavorites(data[1].id)
        btnFavorites3.onclick = () => addFavorites(data[2].id)
    }

    loadFavorites();
   
}



// endpoint favourites https://docs.thecatapi.com/favourites
async function loadFavorites(){
    const imgFavoritas = document.getElementById('imgFavoritas');
    const imgfav = document.getElementById('imgfav');
    const res = await fetch(URL_FAVORITES);
    const data = await res.json();
    
    console.log('data URL FAVORITES')
    console.log(data);

    if(res.status !== 200){
        console.log('algo fallo');
        spanError.innerHTML = '<p>Ocurrio un problema</p>'+response.status;
    }else{
        console.log('esta todo okey');
        // limpiamos el render
        imgFavoritas.innerHTML = '';

        // al limpiar la vista, tenemos que crear todo lo que esta contenia 
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Imagenes Favoritas');
        // h2.value('Imagenes favoritas');
        h2.appendChild(h2Text);
        imgFavoritas.appendChild(h2);
        imgFavoritas.appendChild(imgfav);

        data.map(img =>{
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
    }

}

reload();


async function addFavorites(id){
    console.log(id)

    const response = await fetch(URL_FAVORITES,
        {
        method:'POST',
        mode: 'cors',
        headers:{
            'X-API-KEY': `${API_KEY}`,
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
        loadFavorites();
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
}