const API_KEY = 'live_9vU1zH5wvwihzKOprl7XpQoBpTuLu5eEmYZUiYekMwtjykqGOj8AVrRmXtbqQeZv';

// guardamos el params en un array, aplicamos el join '' para que no separe el contenido del array con ','
let queryParams = ['?','limit=3'].join('');

const URL = `https://api.thecatapi.com/v1/images/search${queryParams}&api_key=${API_KEY}`;

const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');

async function reload(){
    const response = await fetch(URL);
    const data = await response.json();

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}

reload();