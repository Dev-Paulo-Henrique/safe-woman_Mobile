import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fif7o4.sse.codesandbox.io',
});

export const API = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v3/noticias/?busca=abuso%20sexual",
});

export const apiWatch = axios.create({
  baseURL: 'https://dweet.io/get/latest/dweet/for/safewoman?callback',
});

export const refresh = axios.create({
  baseURL: 'https://dweet.io/dweet/for/safewoman?Active=0',
});

export const places = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/'
})

// export default api;
