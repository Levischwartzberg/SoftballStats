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
    return axios.get(`/api/game/player/${playerId}`);
  },

  getGamesByResult: function(resultId) {
    return axios.get(`/api/game/result/${resultId}`);
  },

  getLifetimeStatsForPlayer: function(playerId) {
    return axios.get(`/api/lifetimeStats/${playerId}`);
  },

  getSeasonStatsForPlayer: function(playerId) {
    return axios.get(`/api/seasonStats/${playerId}`);
  },

  getAllSeasons: function() {
    return axios.get("/api/season/");
  },

  getSeasonById: function(seasonId) {
    return axios.get(`/api/season/${seasonId}`);
  }
}