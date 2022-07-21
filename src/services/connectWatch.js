import axios from 'axios';

const apiWatch = axios.create({
  baseURL: 'https://dweet.io/get/latest/dweet/for/safewoman?callback',
});

export default apiWatch;
