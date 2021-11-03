package com.softball.softballstats.controllers;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.domain.LifetimeStats;
import com.softball.softballstats.domain.Player;
import com.softball.softballstats.services.GameService;
import com.softball.softballstats.services.PlayerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/lifetimeStats")
public class LifetimeStatsController {

    private GameService gameService;
    public LifetimeStatsController(GameService gameService, PlayerService playerService) {
        this.gameService = gameService;
        this.playerService = playerService;
    }

    private PlayerService playerService;

    @GetMapping("/{id}")
    public LifetimeStats getPlayersLifetimeStats(@PathVariable Integer id) {
        return calculateLifetimeStats((List<Game>) gameService.findAllGamesByPlayer(id), id);
    }

    //region Helper Methods
    private LifetimeStats calculateLifetimeStats(List<Game> gameList, Integer id) {
        LifetimeStats lifetimeStats = new LifetimeStats();

        Integer games = 0;
        Integer atBats = 0;
        Integer hits = 0;
        Integer singles= 0;
        Integer doubles = 0;
        Integer triples = 0;
        Integer homeruns = 0;
        Integer walks = 0;
        Integer runs = 0;
        Integer rbi = 0;
        for(Game game: gameList) {
            games += 1;
            atBats += game.getAtBats();
            hits += game.getHits();
            singles += game.getSingles();
            doubles += game.getDoubles();
            triples += game.getTriples();
            homeruns += game.getHomeruns();
            walks += game.getWalks();
            runs += game.getRuns();
            rbi += game.getRbi();
        }
        lifetimeStats.setGames(games);
        lifetimeStats.setAtBats(atBats);
        lifetimeStats.setHits(hits);
        lifetimeStats.setSingles(singles);
        lifetimeStats.setDoubles(doubles);
        lifetimeStats.setTriples(triples);
        lifetimeStats.setHomeruns(homeruns);
        lifetimeStats.setWalks(walks);
        lifetimeStats.setRbi(rbi);
        lifetimeStats.setRuns(runs);
        lifetimeStats.setAvg(calculateAVG(hits, atBats));
        lifetimeStats.setObp(calculateOBP(hits, atBats, walks));
        lifetimeStats.setSlg(calculateSLG(singles, doubles, triples, homeruns, atBats));
        lifetimeStats.setOps(calculateOPS(lifetimeStats.getObp(), lifetimeStats.getSlg()));
        lifetimeStats.setPlayer(playerService.findPlayerById(id).get());
        return lifetimeStats;
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
