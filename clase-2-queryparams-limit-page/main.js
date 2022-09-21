
// guardamos el params en un array, aplicamos el join '' para que no separe el contenido del array con ','
let queryParams = ['?','limit=3'].join('');
// modificamos el queryParams para que nos traiga tres elementos
const URL = `https://api.thecatapi.com/v1/images/search${queryParams}`;

const btnRecarga = document.querySelector('.recargaImg');
btnRecarga.addEventListener('click',recarga);

// RESUELTO CON ASYNC AWAIT 
async function recarga(){
    console.log('click');
    const response = await fetch(URL)
    const data = await response.json();
    console.log(data);
    
        console.log(data[0].url)   
        const img1 = document.querySelector('.imagen1');
        const img2 = document.querySelector('.imagen2');
        const img3 = document.getElementById('img3');
        
        img1.setAttribute('src', data[0].url); 
            
        img2.src = data[1].url;         
    
        img3.src = data[2].url;
    }


recarga();