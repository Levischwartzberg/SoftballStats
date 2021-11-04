package com.softball.softballstats.services.impl;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.repositories.GameRepo;
import com.softball.softballstats.services.GameService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GameServiceImpl implements GameService {

    private GameRepo gameRepo;

    public GameServiceImpl(GameRepo gameRepo) {this.gameRepo = gameRepo;}

    @Override
    public Optional<Game> findGameById(Integer id) {
        return gameRepo.findById(id);
    }

    @Override
    public Iterable<Game> findAllGames() {
        return gameRepo.findAll();
    }

    @Override
    public Iterable<Game> findAllGamesByPlayer(Integer playerId) {
        return gameRepo.findAllByPlayerId(playerId);
    }

    @Override
    public Iterable<Game> findAllGamesByResult(Integer resultId) {
        return gameRepo.findAllByResultId(resultId);
    }

    @Override
    public Game saveGame(Game game) {
        return gameRepo.save(game);
    }

    @Override
    public Game updateGame(Game game) {
        return gameRepo.save(game);
    }

    @Override
    public void deleteGame(Game game) {
        gameRepo.delete(game);
    }

    @Override
    public void deleteGame(Integer id) {
        gameRepo.deleteById(id);
    }
}
