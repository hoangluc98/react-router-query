import axios from 'axios';

const API_URL = 'http://localhost:3000';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getSales() {
  await delay(500);
  return axios.get(`${API_URL}/sales`).then((res) => res.data);
}

export async function getSalesData(tab, config = {}) {
  await delay(500);
  return axios.get(`${API_URL}/sales-data?saleType=${tab}`, config).then((res) => res.data);
}

export async function getSalesDetail(id, config = {}) {
  await delay(500);
  return axios.get(`${API_URL}/sales-data/${id}`, config).then((res) => res.data);
}
