package com.softball.softballstats.services.impl;

import com.softball.softballstats.domain.Player;
import com.softball.softballstats.repositories.PlayerRepo;
import com.softball.softballstats.services.PlayerService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService {

    private PlayerRepo playerRepo;

    public PlayerServiceImpl(PlayerRepo playerRepo) {this.playerRepo = playerRepo;}

    @Override
    public Optional<Player> findPlayerById(Integer id) {
        return playerRepo.findById(id);
    }

    @Override
    public Iterable<Player> findAllPlayers() {
        return playerRepo.findAll();
    }

    @Override
    public Player savePlayer(Player player) {
        return playerRepo.save(player);
    }

    @Override
    public Player updatePlayer(Player player) {
        return playerRepo.save(player);
    }

    @Override
    public void deletePlayer(Player player) {
        playerRepo.delete(player);
    }

    @Override
    public void deletePlayer(Integer id) {
        playerRepo.deleteById(id);
    }
}
