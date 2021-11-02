import axios from './axios';

export default {

  getPlayers: function() {
    // const url = 'http://localhost:9091';
    return axios.get("/api/player/");
    // return fetch('/api/player/');
  },

  getPlayerById: function(playerId) {
    return axios.get(`/api/player/${playerId}`)
  },

  addPlayer: function(playerData) {
      return axios.post("/api/player/", playerData);
  },

  getGamesByPlayer: function(playerId) {
    return axios.get(`/api/game/${playerId}`);
  },

  getLifetimeStatsForPlayer: function(playerId) {
    return axios.get(`/api/lifetimeStats/${playerId}`);
  }
}