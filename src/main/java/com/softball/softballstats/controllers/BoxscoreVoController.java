package com.softball.softballstats.controllers;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.domain.Player;
import com.softball.softballstats.domain.Result;
import com.softball.softballstats.domain.Season;
import com.softball.softballstats.domain.VO.BoxscoreVO;
import com.softball.softballstats.services.GameService;
import com.softball.softballstats.services.PlayerService;
import com.softball.softballstats.services.ResultService;
import com.softball.softballstats.services.SeasonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/boxscoreVO")
public class BoxscoreVoController {

    private PlayerService playerService;
    private SeasonService seasonService;
    private GameService gameService;
    private ResultService resultService;

    public BoxscoreVoController(PlayerService playerService, SeasonService seasonService, GameService gameService, ResultService resultService) {
        this.playerService = playerService;
        this.seasonService = seasonService;
        this.gameService = gameService;
        this.resultService = resultService;
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

    @PutMapping("/{seasonId}")
    public ResponseEntity<BoxscoreVO> updateResultsFromBoxscoreVO(@RequestBody BoxscoreVO boxscoreVO, @PathVariable Integer seasonId) {
        List<Player> playerList = boxscoreVO.getPlayerList();
        List<Game> gameList = boxscoreVO.getGameList();
        Result result = boxscoreVO.getResult();

        Result originalResult = resultService.findResultById(result.getId()).get();
        originalResult.setGamesList(gameList);
        originalResult.setResult(result.getResult());
        originalResult.setDate(result.getDate());
        originalResult.setScore(result.getScore());

        Season updateSeason = seasonService.findSeasonById(seasonId).get();
        List<Result> originalResultList = updateSeason.getResultList();
        int resultIdx = 0;
        for(int i = 0; i < originalResultList.size(); i++ ) {
            if(originalResultList.get(i).getId() == result.getId()) {
                resultIdx = i;
            }
        }
        originalResultList.set(resultIdx, originalResult);

        updateSeason.setResultList(originalResultList);

        List<Player> updatedPlayers = new ArrayList<>();

        for(int i = 0; i < playerList.size(); i++) {
            if(!(playerList.get(i).getId() == null)) {
                Player updatePlayer = playerService.findPlayerById(playerList.get(i).getId()).get();

                List<Game> originalGameList = updatePlayer.getGameList();

                Game game = gameList.get(i);
                game.prepareObject();

                int index = 0;

                for(int j = 0; j < originalGameList.size(); j++ ) {
                    if(originalGameList.get(j).getGameId() == game.getGameId()) {
                        index = j;
                    }
                }

                originalGameList.set(index, game);

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

    @DeleteMapping("/seasonId/{seasonId}/resultId/{resultId}")
    public void deleteResultAndIndividualPlayerGames(@PathVariable Integer seasonId, @PathVariable Integer resultId) {
        Season updateSeason = seasonService.findSeasonById(seasonId).get();
        List<Result> originalResultList = updateSeason.getResultList();

        int resultIndex = -1;
        for(int i = 0; i < originalResultList.size(); i++) {
            if(originalResultList.get(i).getId() == resultId) {
                resultIndex = i;
            }
        }
        originalResultList.remove(resultIndex);

        updateSeason.setResultList(originalResultList);

        List<Game> gameList = (List<Game>) gameService.findAllGamesByResult(resultId);
        List<Player> playerList = new ArrayList<>();
        for(Game game : gameList) {
            Player player = playerService.findPlayerById(game.getPlayer().getId()).get();
            List<Game> playerGameList = player.getGameList();
            int gameIndex = -1;
            for(int i = 0; i < playerGameList.size(); i++) {
                if(playerGameList.get(i).getGameId() == game.getGameId()) {
                    gameIndex = i;
                }
            }
            playerGameList.remove(gameIndex);
            player.setGameList(playerGameList);
            playerList.add(player);
        }

        for(Player player : playerList) {
            playerService.savePlayer(player);
        }
        seasonService.saveSeason(updateSeason);
    }
}
