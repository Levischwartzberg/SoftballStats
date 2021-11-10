package com.softball.softballstats.controllers;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.domain.Player;
import com.softball.softballstats.domain.Result;
import com.softball.softballstats.domain.Season;
import com.softball.softballstats.domain.VO.BoxscoreVO;
import com.softball.softballstats.services.PlayerService;
import com.softball.softballstats.services.SeasonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/boxscoreVO")
public class BoxscoreVoController {

    private PlayerService playerService;
    private SeasonService seasonService;

    public BoxscoreVoController(PlayerService playerService, SeasonService seasonService) {
        this.playerService = playerService;
        this.seasonService = seasonService;
    }

    @PutMapping("/")
    public ResponseEntity<BoxscoreVO> saveResultsFromBoxscoreVO(@RequestBody BoxscoreVO boxscoreVO) {
        List<Player> playerList = boxscoreVO.getPlayerList();
        List<Game> gameList = boxscoreVO.getGameList();
        Season season = boxscoreVO.getSeason();
        Result result = boxscoreVO.getResult();
        System.out.println(result.getScore());

        result.setGamesList(gameList);

        Season updateSeason = seasonService.findSeasonById(season.getId()).get();
        List<Result> originalResultList = updateSeason.getResultList();
        originalResultList.add(result);
        updateSeason.setResultList(originalResultList);

        List<Player> updatedPlayers = new ArrayList<>();

        for(int i = 0; i < playerList.size(); i++) {
            System.out.println("i: " + i );
            if(!(playerList.get(i).getId() == null)) {
                Player updatePlayer = playerService.findPlayerById(playerList.get(i).getId()).get();
                System.out.println("current player: " + updatePlayer.getLastName());
                List<Game> originalGameList = updatePlayer.getGameList();
                Game game = gameList.get(i);
                game.prepareObject();
                originalGameList.add(game);
                updatePlayer.setGameList(originalGameList);
                updatedPlayers.add(updatePlayer);
            }
        }
        for(Player player : updatedPlayers) {
            playerService.updatePlayer(player);
        }
        seasonService.updateSeason(updateSeason);
        return new ResponseEntity<>(boxscoreVO, HttpStatus.ACCEPTED);
    }
}
