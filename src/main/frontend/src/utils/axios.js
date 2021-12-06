import axios from 'axios';
// const instance = axios.create({baseURL: 'http://localhost:9091'});
const instance = axios.create({baseURL: 'http://ec2-18-217-51-221.us-east-2.compute.amazonaws.com:9091'});
export default instance;