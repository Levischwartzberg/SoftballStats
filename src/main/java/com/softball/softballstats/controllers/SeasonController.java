package com.softball.softballstats.controllers;

import com.softball.softballstats.domain.Season;
import com.softball.softballstats.services.SeasonService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/season")
public class SeasonController {

    private SeasonService seasonService;

    public SeasonController(SeasonService seasonService) {this.seasonService = seasonService;}

    @GetMapping("/")
    public Iterable<Season> getAllSeasons() {
        return seasonService.findAllSeasons();
    }

    @GetMapping("/{id}")
    public Season getSeasonById(@PathVariable Integer id) {
        return seasonService.findSeasonById(id).get();
    }

    @PostMapping("/")
    public Season createSeason(@RequestBody Season season) {
        return seasonService.saveSeason(season);
    }

    @PutMapping("/")
    public Season updateSeason(@RequestBody Season season) {
        return seasonService.updateSeason(season);
    }

    @DeleteMapping("/")
    public void deleteSeason(@RequestBody Season season) {
        seasonService.deleteSeason(season);
    }

    @DeleteMapping("/{id}")
    public void deleteSeason(@PathVariable Integer id) {
        seasonService.deleteSeason(id);
    }
}
