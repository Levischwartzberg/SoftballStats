package com.softball.softballstats.repositories;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.domain.Player;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepo extends CrudRepository<Game, Integer> {

    List<Game> findAllByPlayerId(Integer playerId);
}
