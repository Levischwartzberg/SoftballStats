package com.softball.softballstats.services.impl;

import com.softball.softballstats.domain.LifetimeStats;
import com.softball.softballstats.repositories.LifetimeStatsRepo;
import com.softball.softballstats.services.LifetimeStatsService;

public class LifetimeStatsServiceImpl implements LifetimeStatsService {

    private LifetimeStatsRepo lifetimeStatsRepo;
    public LifetimeStatsServiceImpl(LifetimeStatsRepo lifetimeStatsRepo) {this.lifetimeStatsRepo = lifetimeStatsRepo;}

    @Override
    public LifetimeStats findLifetimeStatsByPlayer(Integer playerId) {
        return lifetimeStatsRepo.findTopByPlayerId(playerId);
    }
}
