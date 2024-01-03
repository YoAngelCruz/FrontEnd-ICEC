import axios from 'axios';

class Api {
  constructor(baseUrl) {    //aqui va la url de la api base
    this.baseUrl = baseUrl;
  }

  async get(path) {
      const url = `${this.baseUrl}${path}`;
      const response = await axios.get(url);
      return response.data;
  }

  async post(path, data) {
    const url = `${this.baseUrl}${path}`;
    const response = await axios.post(url, data);
    return response.data;
  }

  async put(path, data) {
    const url = `${this.baseUrl}${path}`;
    const response = await axios.put(url, data);
    return response.data;
  }

  async delete(path) {
    const url = `${this.baseUrl}${path}`;
    const response = await axios.delete(url);
    return response.data;
  }
}

const apic = new Api('https://icec-crud-yoangelcruz.cloud.okteto.net//api');
export default apic;