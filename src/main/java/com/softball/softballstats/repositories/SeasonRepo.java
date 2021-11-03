package com.softball.softballstats.repositories;

import com.softball.softballstats.domain.Season;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface SeasonRepo extends CrudRepository<Season, Integer> {

    Optional<Season> findSeasonBySessionAndYear(String session, Integer year);
}
