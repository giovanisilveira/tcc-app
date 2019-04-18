import { create } from 'apisauce';

const api = create({
    baseURL: 'https://giovani-tcc.herokuapp.com',
    // baseURL: 'http://localhost:3000',
    headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json'
      },
});

api.setHeaders({
    'Authorization': 'token',
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;