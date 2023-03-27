import axios from 'axios';

export function getSales() {
  return axios.get('http://localhost:3000/sales').then((res) => res.data);
}

export function getSalesData(tab) {
  return axios.get(`http://localhost:3000/sales-data?saleType=${tab}`).then((res) => res.data);
}

export function getSalesDetail(id) {
  return axios.get(`http://localhost:3000/sales-data/${id}`).then((res) => res.data);
}

// export function getPostsPaginated(page) {
//   return axios
//     .get('http://localhost:3000/posts', {
//       params: { _page: page, _sort: 'title', _limit: 2 }
//     })
//     .then((res) => {
//       const hasNext = page * 2 <= parseInt(res.headers['x-total-count']);
//       return {
//         nextPage: hasNext ? page + 1 : undefined,
//         previousPage: page > 1 ? page - 1 : undefined,
//         posts: res.data
//       };
//     });
// }

// export function getPost(id) {
//   return axios.get(`http://localhost:3000/posts/${id}`).then((res) => res.data);
// }

// export function createPost({ title, body }) {
//   return axios
//     .post('http://localhost:3000/posts', {
//       title,
//       body,
//       userId: 1,
//       id: Date.now()
//     })
//     .then((res) => res.data);
// }
