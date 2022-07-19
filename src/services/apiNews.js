import axios from 'axios';

const API = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v3/noticias/?busca=abuso%20sexual",
});
// baseURL: "https://newsdata.io/api/1/news?apikey=pub_92693d267e22c82e8d7ca3f2340f9ac11a5e&q=woman",
// e60e75275b8f4845ad6874a67a7016b0

export default API;