package com.softball.softballstats.controllers;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.services.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private GameService gameService;

    public GameController(GameService gameService) {this.gameService = gameService;}

    @GetMapping("/")
    public Iterable<Game> getAllGames() {return gameService.findAllGames();}

    @GetMapping("/{playerId}")
    public Iterable<Game> getAllPlayerGames(@PathVariable Integer playerId) {
        System.out.println(playerId);
//        List<Game> gameList = (List<Game>) gameService.findAllGamesByPlayer(playerId);
//        System.out.println(gameList.size());
//        for(Game game : gameList) {
//            System.out.println(game.getAtBats());
//        }
        return gameService.findAllGamesByPlayer(playerId);
    }

    @PostMapping("/")
    public ResponseEntity<Game> saveGame(@RequestBody Game game) {return new ResponseEntity<Game>(gameService.saveGame(game), HttpStatus.CREATED);}

    @PutMapping("/")
    public ResponseEntity<Game> updateGame(@RequestBody Game game) {return new ResponseEntity<Game>(gameService.saveGame(game), HttpStatus.ACCEPTED);}

    @DeleteMapping("/")
    public void deleteGame(@RequestBody Game game) {gameService.deleteGame(game);}

    @DeleteMapping("/{id}")
    public void deleteGameById(@PathVariable Integer gameId) {gameService.deleteGame(gameId);}
}
