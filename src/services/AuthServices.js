import axios from 'axios';
//Al momento de usar este se tiene que instanciar y colocar la url del API donde este la utenticacion de usuario 
// this.authService = new AuthService('https://example.com/api/auth');
class AuthService { 
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async login(json) {
    const url = `${this.baseUrl}/login`;
    const response = await axios.post(url, json );
    return response.data;
  }

  async logout() {
    const url = `${this.baseUrl}/logout`;
    const response = await axios.post(url);
    return response.data;
  }

}

export default AuthService;