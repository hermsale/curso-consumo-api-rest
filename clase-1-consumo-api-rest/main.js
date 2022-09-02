// https://docs.thecatapi.com/1.0/pagination
console.log('Se cargo todo OK');

const URL = 'https://api.thecatapi.com/v1/images/search';

const btnRecarga = document.querySelector('.recargaImg');
btnRecarga.addEventListener('click',recarga);

// cambiamos de imagen al hacer click en el boton
function recarga(){
    console.log('click');
    fetch(URL)
    .then(res => res.json()) 
    .then(data => {
        console.log(data[0].url)   
        const img1 = document.querySelector('.imagen1');
        img1.setAttribute('src', data[0].url); 
        // 
      
            const img2 = document.querySelector('.imagen2');
            img2.src = data[0].url;         
    
    })
}


recarga();