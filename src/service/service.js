import axios from 'axios';

//Desarrollo
// const baseUrl = 'http://localhost:8091/';

//Produccion
const baseUrl = 'https://datausa.io/';   

export default axios.create({
    baseURL: baseUrl
});
