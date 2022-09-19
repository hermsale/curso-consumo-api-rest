// https://docs.thecatapi.com/1.0/pagination
console.log('Se cargo todo OK');

const URL = 'https://api.thecatapi.com/v1/images/search';

const btnRecarga = document.querySelector('.recargaImg');
btnRecarga.addEventListener('click',recarga);

// RESUELTO CON PROMESAS
// function recarga(){
//     console.log('click');
//     fetch(URL)
//     .then(res => res.json()) 
//     .then(data => {
//         console.log(data[0].url)   
//         const img1 = document.querySelector('.imagen1');
//         img1.setAttribute('src', data[0].url); 
//         // modificamos la propiedad src       
//             const img2 = document.querySelector('.imagen2');
//             img2.src = data[0].url;         
    
//     })
// }

// RESUELTO CON ASYNC AWAIT 
async function recarga(){
    console.log('click');
    const response = await fetch(URL)
    const data = await response.json();
    
        console.log(data[0].url)   
        const img1 = document.querySelector('.imagen1');
        // modificamos el atributo src 
        img1.setAttribute('src', data[0].url); 
        const img2 = document.querySelector('.imagen2');
        // modificamos la propiedad src       
            img2.src = data[0].url;         
    
    }


recarga();