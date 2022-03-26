import axios from './axios';

function createAuthHeader() {
  if(localStorage.getItem("user") !== "") {
    return {Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).jwtToken};
  }
}
  
export default {

  login: function(account) {
    return axios.post("/login/", account)
  },

  getPlayers: function() {
    // const url = 'http://localhost:9091';
    return axios.get("/api/player/");
    // return fetch('/api/player/');
  },

  getPlayerById: function(playerId) {
    return axios.get(`/api/player/${playerId}`)
  },

  addPlayer: function(playerData) {
      return axios.post("/api/player/", playerData, {headers: createAuthHeader()});
  },

  updatePlayer: function(playerData) {
    return axios.put("/api/player/", playerData, {headers: createAuthHeader()});
  },

  deletePlayer: function(playerId) {
    return axios.delete(`/api/player/${playerId}`, {headers: createAuthHeader()});
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

  getTeamStatsBySeason: function(seasonId) {
    return axios.get(`/api/seasonStats/team/${seasonId}`);
  },

  getAllSeasons: function() {
    return axios.get("/api/season/");
  },

  getSeasonById: function(seasonId) {
    return axios.get(`/api/season/${seasonId}`);
  },

  addSeason: function(seasonData) {
    return axios.post("/api/season/", seasonData, {headers: createAuthHeader()});
  },

  updateSeason: function(seasonData) {
    return axios.put("/api/season/", seasonData, {headers: createAuthHeader()});
  },

  deleteSeason: function(seasonId) {
    return axios.delete(`/api/season/${seasonId}`, {headers: createAuthHeader()});
  },

  saveNewFromSingleGameBoxscore: function(boxscoreVO) {
    return axios.put("/api/boxscoreVO/", boxscoreVO, {headers: createAuthHeader()});
  },

  updateExistingFromSingleGameBoxscore: function(boxscoreVO, seasonId) {
    return axios.put(`api/boxscoreVO/${seasonId}`, boxscoreVO, {headers: createAuthHeader()});
  },

  deleteResultAndGames: function(seasonId, resultId) {
    return axios.delete(`/api/boxscoreVO/seasonId/${seasonId}/resultId/${resultId}`, {headers: createAuthHeader()});
  }
}