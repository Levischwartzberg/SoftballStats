package com.softball.softballstats.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.softball.softballstats.domain.Game;
import com.softball.softballstats.domain.LifetimeStats;
import com.softball.softballstats.domain.SeasonStats;
import com.softball.softballstats.services.GameService;
import com.softball.softballstats.services.SeasonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

    //region Custom Methods
    public Iterable<SeasonStats> computeSeasonStatsByPlayer(List<Game> gameList) {
        HashMap<Integer, SeasonStats> seasonHash = new HashMap<>();
        for(Game game: gameList) {
            Integer seasonId = game.getResult().getSeason().getId();
            SeasonStats seasonStats = new SeasonStats();
            if(!seasonHash.containsKey(seasonId)) {
                seasonStats.initializeCountingStatsWithZero();
                seasonHash.put(game.getResult().getSeason().getId(), seasonStats);
            }
            seasonStats.setGames(seasonHash.get(seasonId).getGames() + 1);
            seasonStats.setAtBats(seasonHash.get(seasonId).getAtBats() + game.getAtBats());
            seasonStats.setHits(seasonHash.get(seasonId).getHits() + game.getHits());
            seasonStats.setSingles(seasonHash.get(seasonId).getSingles() + game.getSingles());
            seasonStats.setDoubles(seasonHash.get(seasonId).getDoubles() + game.getDoubles());
            seasonStats.setTriples(seasonHash.get(seasonId).getTriples() + game.getTriples());
            seasonStats.setHomeruns(seasonHash.get(seasonId).getHomeruns() + game.getHomeruns());
            seasonStats.setWalks(seasonHash.get(seasonId).getWalks() + game.getWalks());
            seasonStats.setRuns(seasonHash.get(seasonId).getRuns() + game.getRuns());
            seasonStats.setRbi(seasonHash.get(seasonId).getRbi() + game.getRbi());
            seasonStats.setSeason(seasonService.findSeasonById(seasonId).get());
            seasonStats.setPlayer(game.getPlayer());

            seasonStats.setAvg(calculateAVG(seasonStats.getHits(), seasonStats.getAtBats()));
            seasonStats.setObp(calculateOBP(seasonStats.getHits(), seasonStats.getAtBats(), seasonStats.getWalks()));
            seasonStats.setSlg(calculateSLG(seasonStats.getSingles(), seasonStats.getDoubles(), seasonStats.getTriples(), seasonStats.getHomeruns(), seasonStats.getAtBats()));
            seasonStats.setOps(calculateOPS(seasonStats.getObp(), seasonStats.getSlg()));

            seasonHash.put(game.getResult().getSeason().getId(), seasonStats);
        }

        return new ArrayList<SeasonStats>(seasonHash.values());
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
