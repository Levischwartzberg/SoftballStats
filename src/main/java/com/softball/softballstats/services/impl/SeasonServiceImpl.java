package com.softball.softballstats.services.impl;

import com.softball.softballstats.domain.Season;
import com.softball.softballstats.repositories.SeasonRepo;
import com.softball.softballstats.services.SeasonService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SeasonServiceImpl implements SeasonService {

    private SeasonRepo seasonRepo;

    public SeasonServiceImpl(SeasonRepo seasonRepo) {this.seasonRepo = seasonRepo;}

    @Override
    public Iterable<Season> findAllSeasons() {
        return seasonRepo.findAll();
    }

    @Override
    public Optional<Season> findSeasonById(Integer id) {
        return seasonRepo.findById(id);
    }

    @Override
    public Optional<Season> findSeasonBySessionAndYear(String session, Integer year) {
        return seasonRepo.findSeasonBySessionAndYear(session, year);
    }

    @Override
    public Season saveSeason(Season season) {
        return seasonRepo.save(season);
    }

    @Override
    public Season updateSeason(Season season) {
        return seasonRepo.save(season);
    }

    @Override
    public void deleteSeason(Season season) {
        seasonRepo.delete(season);
    }

    @Override
    public void deleteSeason(Integer id) {
        seasonRepo.deleteById(id);
    }
}
