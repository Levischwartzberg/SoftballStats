package com.softball.softballstats.bootstrap;

import com.softball.softballstats.domain.Player;
import com.softball.softballstats.services.PlayerService;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class SeedData implements ApplicationListener<ContextRefreshedEvent>{

    PlayerService playerService;

    public SeedData(PlayerService playerService) {
        this.playerService = playerService;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        Player player1 = new Player();
        player1.setName("Socks Seybold");
        player1.setHits(35);
        player1.setAtBats(112);

        Player player2 = new Player();
        player2.setName("Rube Bickworth");
        player2.setHits(50);
        player2.setAtBats(160);

        playerService.savePlayer(player1);
        playerService.savePlayer(player2);

    }
}
