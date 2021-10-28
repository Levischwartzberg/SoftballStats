import axios from './axios';

export default {

  getPlayers: function() {
    // const url = 'http://localhost:9091';
    return axios.get("/api/player/");
    // return fetch('/api/player/');
  },

  addPlayer: function(playerData) {
      return axios.post("/api/player/", playerData);
  }
}