import axios from 'axios';

class IdeasApi {
    #apiUrl;

    constructor() {
        // this.#apiUrl = 'http://localhost:5000/api/ideas';
        this.#apiUrl = '/api/ideas';  // This is the URL for deployment to the backend app on render.com

        // You need to add a proxy to the webpack.config.js file to allow you still run it in development mode
    }

    async getIdeas() {
        // Using fetch
        const response = await fetch(this.#apiUrl);
        return response.json();

        // Using axios
        // return axios.get(this.#apiUrl);
    }

    createIdea(data) {
        // Using fetch
        // return fetch(this.#apiUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });

        // Using axios
        return axios.post(this.#apiUrl, data);
    }

    updateIdea(id, data) {
        // Using fetch
        // return fetch(`${this.#apiUrl}/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });

        // Using axios
        return axios.put(`${this.#apiUrl}/${id}`, data);
    }

    deleteIdea(id) {
        const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';

        // Using Axios
        return axios.delete(`${this.#apiUrl}/${id}`, {
            data: {
                username
            }
        });

        // Using fetch
        // return fetch(`${this.#apiUrl}/${id}`, {
        //     method: 'DELETE'
        // });

    }
}

export default new IdeasApi();  // You can export an instance of the class directly