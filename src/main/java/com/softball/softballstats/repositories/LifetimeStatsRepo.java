package com.softball.softballstats.repositories;

import com.softball.softballstats.domain.LifetimeStats;
import org.springframework.data.repository.CrudRepository;

public interface LifetimeStatsRepo extends CrudRepository<LifetimeStats, Integer> {
    public LifetimeStats findTopByPlayerId(Integer playerId);
}
