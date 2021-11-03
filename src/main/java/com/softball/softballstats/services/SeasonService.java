package com.softball.softballstats.services;

import com.softball.softballstats.domain.Season;

import java.util.Optional;

public interface SeasonService {

    Iterable<Season> findAllSeasons();

    Optional<Season> findSeasonById(Integer id);

    Optional<Season> findSeasonBySessionAndYear(String session, Integer year);

    Season saveSeason(Season season);

    Season updateSeason(Season season);

    void deleteSeason(Season season);

    void deleteSeason(Integer id);
}
