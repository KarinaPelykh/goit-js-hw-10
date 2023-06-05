import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select'

import Notiflix from 'notiflix';
const select = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const error = document.querySelector(".error");
const loader = document.querySelector(".loader");

function hidenLoader() {
    loader.classList.remove("invisible");
    select.classList.toggle("invisible");
    catInfo.classList.toggle("invisible");
    error.classList.add("invisible");
}

fetchBreeds().then(data => {
    data.forEach(dataInfo => {
        const dataInfoCat = document.createElement('option');
        dataInfoCat.value = dataInfo.id;
        dataInfoCat.textContent = dataInfo.name;
        select.append(dataInfoCat)
        
    });

    new SlimSelect({
        select: '#single'
    });
   
}).catch(error => {
    Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`)
    select.classList.toggle("invisible");
}).finally(
    setTimeout(() => {
        loader.classList.add("invisible");
        select.classList.toggle("invisible");
        catInfo.classList.toggle("invisible")
    }, 1500) 
   
)


const onSelectCatID = (event) => {
const breedId = event.target.value;
    console.log(breedId);

hidenLoader();
fetchCatByBreed(breedId).then(breed => {
    const cat = breed[0];
    console.log(cat);
     
const CatImgInfo =
    `<img class="img" src="${cat.url}" alt="cat" width="300"/>
    <h2>${cat.breeds[0].name} </h2>
    <p>${cat.breeds[0].description}</p>
   <p><span class="text">Temperament:</span> ${cat.breeds[0].temperament}</p>
   `
    catInfo.innerHTML = CatImgInfo;
})
.catch(error => {
       Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`)

})
.finally(
        setTimeout(() => {
        loader.classList.add("invisible");
        select.classList.toggle("invisible");
        catInfo.classList.toggle("invisible")
    
    }, 1500)
    )
}

select.addEventListener('change', onSelectCatID)
hidenLoader()
