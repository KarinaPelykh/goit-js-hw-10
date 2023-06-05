
const KEY_API = 'live_viINcJEgE983vigqtP9gN4K3Sd2Ak8Ulo0p9JiKCwY8zuRkX6NLm7sH2mp2iqNKU';
const BASE_URL = 'https://api.thecatapi.com';

export const fetchBreeds = () => {
    return fetch(`${BASE_URL}/v1/breeds?api_key=${KEY_API}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }

            return response.json();
            
        })
        .catch(error => {
            console.log(error);
        })
};

 export const fetchCatByBreed = breedId => {
   return fetch(`${BASE_URL}/v1/images/search?api_key=${KEY_API}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
           
        })
       .catch(error => console.log(error));
}
