package com.softball.softballstats.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.softball.softballstats.domain.*;
import com.softball.softballstats.services.GameService;
import com.softball.softballstats.services.SeasonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/api/seasonStats")
public class SeasonStatsController {

    private GameService gameService;
    private SeasonService seasonService;
    public SeasonStatsController(GameService gameService, SeasonService seasonService) {
        this.gameService = gameService;
        this.seasonService = seasonService;
    }

    @GetMapping("/{playerId}")
    public Iterable<SeasonStats> getAllSeasonStatsByPlayer(@PathVariable Integer playerId) {
        List<SeasonStats> seasonStatsList = new ArrayList<>();
        List<Game> gameList = (List<Game>) gameService.findAllGamesByPlayer(playerId);
        return computeSeasonStatsByPlayer(gameList);
    }

    @GetMapping("/team/{seasonId}")
    public Iterable<SeasonStats> getAllPlayersStatsBySeason(@PathVariable Integer seasonId) {
        List<SeasonStats> seasonStatsList = new ArrayList<>();
        Season season = seasonService.findSeasonById(seasonId).get();
        Map<Integer, SeasonStats> seasonStatsMap = new HashMap<>();
        for(Result result : season.getResultList()) {
            List<Game> gameList = result.getGamesList();
            System.out.println("Games in Result " + gameList.size());
            for(Game game : gameList) {
                Integer playerId = game.getPlayer().getId();
                game.prepareObject();
                if(!seasonStatsMap.containsKey(playerId)) {
                    SeasonStats newSeasonStats = new SeasonStats();

                    newSeasonStats.initializeCountingStatsWithZero();
                    newSeasonStats = incrementSeasonStats(newSeasonStats, game);

                    seasonStatsMap.put(playerId, newSeasonStats);
                } else {
                    SeasonStats prevSeasonStats = seasonStatsMap.get(playerId);

                    prevSeasonStats = incrementSeasonStats(prevSeasonStats, game);
                    seasonStatsMap.put(playerId, prevSeasonStats);
                }
            }
        }
        for(SeasonStats statline : seasonStatsMap.values()) {
            seasonStatsList.add(statline);
        }
        return seasonStatsList;
    }

    //region Custom Methods
    public Iterable<SeasonStats> computeSeasonStatsByPlayer(List<Game> gameList) {
        HashMap<Integer, SeasonStats> seasonHash = new HashMap<>();
        for(Game game: gameList) {
            Integer seasonId = game.getResult().getSeason().getId();
            Season season = seasonService.findSeasonById(seasonId).get();
            SeasonStats seasonStats = new SeasonStats();
            if(!seasonHash.containsKey(seasonId)) {
                seasonStats.initializeCountingStatsWithZero();
                seasonStats.setSeason(season);
                seasonHash.put(seasonId, seasonStats);
            }

            seasonStats = incrementSeasonStats(seasonHash.get(seasonId), game);

            seasonHash.put(game.getResult().getSeason().getId(), seasonStats);
        }

        return new ArrayList<SeasonStats>(seasonHash.values());
    }

    public SeasonStats incrementSeasonStats(SeasonStats ogSznStats, Game newGame) {
        SeasonStats seasonStats = new SeasonStats();
        seasonStats.setPlayer(newGame.getPlayer());
        seasonStats.setSeason(ogSznStats.getSeason());

        seasonStats.setGames(ogSznStats.getGames() + 1);
        seasonStats.setAtBats(ogSznStats.getAtBats() + newGame.getAtBats());
        seasonStats.setHits(ogSznStats.getHits() + newGame.getHits());
        seasonStats.setSingles(ogSznStats.getSingles() + newGame.getSingles());
        seasonStats.setDoubles(ogSznStats.getDoubles() + newGame.getDoubles());
        seasonStats.setTriples(ogSznStats.getTriples() + newGame.getTriples());
        seasonStats.setHomeruns(ogSznStats.getHomeruns() + newGame.getHomeruns());
        seasonStats.setWalks(ogSznStats.getWalks() + newGame.getWalks());
        seasonStats.setRuns(ogSznStats.getRuns() + newGame.getRuns());
        seasonStats.setRbi(ogSznStats.getRbi() + newGame.getRbi());
        seasonStats.setSeason(ogSznStats.getSeason());
        seasonStats.setPlayer(newGame.getPlayer());

        seasonStats.setAvg(calculateAVG(seasonStats.getHits(), seasonStats.getAtBats()));
        seasonStats.setObp(calculateOBP(seasonStats.getHits(), seasonStats.getAtBats(), seasonStats.getWalks()));
        seasonStats.setSlg(calculateSLG(seasonStats.getSingles(), seasonStats.getDoubles(), seasonStats.getTriples(), seasonStats.getHomeruns(), seasonStats.getAtBats()));
        seasonStats.setOps(calculateOPS(seasonStats.getObp(), seasonStats.getSlg()));

        return seasonStats;
    }

    public static double calculateAVG(Integer hits, Integer atBats) {
        return (double) hits / (double) atBats;
    }
    public static double calculateOBP(Integer hits, Integer atBats, Integer walks) {
        return ((double) hits + (double) walks) / ((double) atBats + (double) walks);
    }
    public static double calculateSLG(Integer singles, Integer doubles, Integer triples, Integer homeruns, Integer atBats) {
        return (1*(double) singles + 2*(double) doubles + 3*(double) triples + 4*(double) homeruns) / (double) atBats;
    }
    public static double calculateOPS(double obp, double slg) {
        return obp + slg;
    }
    //endregion
}
