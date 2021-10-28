package com.softball.softballstats.bootstrap;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.domain.Player;
import com.softball.softballstats.services.PlayerService;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SeedData implements ApplicationListener<ContextRefreshedEvent>{

    PlayerService playerService;

    public SeedData(PlayerService playerService) {
        this.playerService = playerService;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        Game game1 = new Game(4,3,1,0,1,1,0,2,4);
        Game game2 = new Game(4,2,1,1,0,0,0,2,2);
        Game game3 = new Game(3,3,3,0,0,0,1,3,1);
        Game game4 = new Game(4,1,0,1,0,0,0,1,1);

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
        player1.setGameList(gameList2);

        playerService.savePlayer(player1);
        playerService.savePlayer(player2);

    }
}
