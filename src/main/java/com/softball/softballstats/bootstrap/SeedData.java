package com.softball.softballstats.bootstrap;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.domain.Player;
import com.softball.softballstats.domain.Result;
import com.softball.softballstats.domain.Season;
import com.softball.softballstats.services.PlayerService;
import com.softball.softballstats.services.ResultService;
import com.softball.softballstats.services.SeasonService;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class SeedData implements ApplicationListener<ContextRefreshedEvent>{

    PlayerService playerService;
    SeasonService seasonService;

    public SeedData(PlayerService playerService, SeasonService seasonService) {
        this.playerService = playerService;
        this.seasonService = seasonService;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        Season season = new Season();
        season.setSession("Summer");
        season.setYear(2021);
        List<Result> resultList = new ArrayList<>();

        Result result1 = new Result();
        result1.setResult("Win");
        result1.setScore("14-12");
        result1.setDate(new Date(2021,5,8));

        Result result2 = new Result();
        result2.setResult("Win");
        result2.setScore("13-8");
        result2.setDate(new Date(2021,5,15));

        Game game1 = new Game(4,3,1,0,1,1,0,2,4);
        Game game2 = new Game(4,2,1,1,0,0,0,2,2);
        Game game3 = new Game(3,3,3,0,0,0,1,3,1);
        Game game4 = new Game(4,1,0,1,0,0,0,1,1);

        List<Game> gamesList1 = new ArrayList<>();
        gamesList1.add(game1); gamesList1.add(game3);
        result1.setGamesList(gamesList1);

        List<Game> gamesList2 = new ArrayList<>();
        gamesList2.add(game2); gamesList2.add(game4);
        result2.setGamesList(gamesList2);

        resultList.add(result1); resultList.add(result2);
        season.setResultList(resultList);

        Player player1 = new Player();
        player1.setFirstName("Socks");
        player1.setLastName("Seybold");
        player1.setHeight("5'11");
        player1.setWeight(175);
        player1.setThrowHand("Right");
        player1.setBatHand("Right");
        List<Game> gameList1 = new ArrayList<>();
        gameList1.add(game1);
        gameList1.add(game2);
        player1.setGameList(gameList1);

        Player player2 = new Player();
        player2.setFirstName("Burt");
        player2.setLastName("Jigworth");
        player2.setHeight("6'2");
        player2.setWeight(195);
        player2.setThrowHand("Right");
        player2.setBatHand("Right");
        List<Game> gameList2 = new ArrayList<>();
        gameList2.add(game3);
        gameList2.add(game4);
        player2.setGameList(gameList2);

        playerService.savePlayer(player1);
        playerService.savePlayer(player2);
        seasonService.saveSeason(season);
    }
}
