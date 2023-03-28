import axios from 'axios';

const API_URL = 'http://localhost:3000';

export function getSales() {
  return axios.get(`${API_URL}/sales`).then((res) => res.data);
}

export function getSalesData(tab, config = {}) {
  return axios.get(`${API_URL}/sales-data?saleType=${tab}`, config).then((res) => res.data);
}

export function getSalesDetail(id, config = {}) {
  return axios.get(`${API_URL}/sales-data/${id}`, config).then((res) => res.data);
}
