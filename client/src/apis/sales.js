import axios from 'axios';

const API_URL = 'http://localhost:3000';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getSales() {
  const res = await axios.get(`${API_URL}/sales`);
  await delay(3000);
  return res.data;
}

export async function getSalesData(tab, config = {}) {
  const res = await axios.get(`${API_URL}/sales-data?saleType=${tab}`, config);
  await delay(3000);
  return res.data;
}

export async function getSalesDetail(id, config = {}) {
  const res = await axios.get(`${API_URL}/sales-data/${id}`, config);
  await delay(3000);
  return res.data;
}
