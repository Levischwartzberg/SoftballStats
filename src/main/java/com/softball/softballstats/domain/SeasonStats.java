package com.softball.softballstats.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class SeasonStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer games;
    private Integer atBats;
    private Integer hits;
    private Integer singles;
    private Integer doubles;
    private Integer triples;
    private Integer homeruns;
    private Integer walks;
    private Integer runs;
    private Integer rbi;
    private double avg;
    private double obp;
    private double slg;
    private double ops;

    @ManyToOne
    private Player player;

    @OneToOne
    private Season season;

    //region Custom Methods
    public void initializeCountingStatsWithZero() {
        this.games = 0;
        this.atBats = 0;
        this.hits = 0;
        this.singles = 0;
        this.doubles = 0;
        this.triples = 0;
        this.homeruns = 0;
        this.walks = 0;
        this.runs = 0;
        this.rbi = 0;
    }
    //endregion
}
