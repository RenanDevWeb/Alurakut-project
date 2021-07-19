import axios from 'axios'

const URLBASE = 'https://api.github.com/users/RenanDevWeb/'

const api = axios.create({
  baseURL: URLBASE
});

module.exports  = api  