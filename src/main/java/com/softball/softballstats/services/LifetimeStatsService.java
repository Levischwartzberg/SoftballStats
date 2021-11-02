package com.softball.softballstats.services;

import com.softball.softballstats.domain.LifetimeStats;

public interface LifetimeStatsService {

    public LifetimeStats findLifetimeStatsByPlayer(Integer playerId);
}
