package com.softball.softballstats.controllers;

import com.softball.softballstats.domain.Player;
import com.softball.softballstats.services.PlayerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/player")
public class PlayerController {

    private PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping("/")
    public Iterable<Player> getAllPlayers() {
        return playerService.findAllPlayers();
    }

    @PostMapping("/")
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) {
        return new ResponseEntity<>(playerService.savePlayer(player), HttpStatus.CREATED);
    }

    @PutMapping("/")
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player) {
        return new ResponseEntity<>(playerService.updatePlayer(player), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/")
    public void deletePlayer(@RequestBody Player player) {
        playerService.deletePlayer(player);
    }

    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Integer id) {
        playerService.deletePlayer(id);
    }

    @GetMapping("/{id}")
    public Optional<Player> findPlayerById(@PathVariable Integer id) {
        return playerService.findPlayerById(id);
    }
}
