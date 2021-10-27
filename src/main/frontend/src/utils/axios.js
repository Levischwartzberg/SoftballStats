import axios from 'axios';
const instance = axios.create({baseURL: 'http://localhost:9091'});
export default instance