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

  updatePlayer: function(playerData) {
    return axios.put("/api/player/", playerData);
  },

  getGamesByPlayer: function(playerId) {
    return axios.get(`/api/game/player/${playerId}`);
  },

  getGameLogBySeason: function(playerId, seasonId) {
    return axios.get(`/api/game/player/${playerId}/season/${seasonId}`);
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
  },

  addSeason: function(seasonData) {
    return axios.post("/api/season/", seasonData);
  },

  updateSeason: function(seasonData) {
    return axios.put("/api/season/", seasonData);
  },

  saveNewFromSingleGameBoxscore: function(boxscoreVO) {
    return axios.put("/api/boxscoreVO/", boxscoreVO);
  },

  updateExistingFromSingleGameBoxscore: function(boxscoreVo, seasonId) {
    return axios.put(`api/boxscoreVO/${seasonId}`, boxscoreVo);
  }
}