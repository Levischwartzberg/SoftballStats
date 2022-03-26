import axios from 'axios';
// const instance = axios.create({baseURL: 'http://localhost:8080'});
// const instance = axios.create({baseURL: 'http://ec2-18-217-51-221.us-east-2.compute.amazonaws.com:8080'});
const instance = axios.create({baseURL: 'https://cert-manager-htb.heretobeeratmorts.com'});
export default instance;