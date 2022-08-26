import axios from 'axios';

export const apiWatch = axios.create({
  baseURL: 'https://dweet.io/get/latest/dweet/for/safewoman?callback',
});

export const refresh = axios.create({
  baseURL: 'https://dweet.io/dweet/for/safewoman?Active=0',
});

export const places = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org/'
});