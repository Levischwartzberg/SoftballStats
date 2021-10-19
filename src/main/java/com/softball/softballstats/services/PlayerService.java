package com.softball.softballstats.services;

import com.softball.softballstats.domain.Player;

import java.util.Optional;

public interface PlayerService {

    Optional<Player> findPlayerById(Integer id);

    Iterable<Player> findAllPlayers();

    Player savePlayer(Player player);

    Player updatePlayer(Player player);

    void deletePlayer(Player player);

    void deletePlayer(Integer id);
}
