package com.softball.softballstats.services;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.domain.Player;

import java.util.Optional;


public interface GameService {

    Optional<Game> findGameById(Integer id);

    Iterable<Game> findAllGames();

    Iterable<Game> findAllGamesByPlayer(Integer playerId);

    Game saveGame(Game game);

    Game updateGame(Game game);

    void deleteGame(Game game);

    void deleteGame(Integer id);
}
