package com.softball.softballstats.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.data.relational.core.sql.In;

import javax.persistence.*;

@Entity
@Data
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "gameId")
    private Integer gameId;

    public Game() {}

    public Game(Integer atBats, Integer hits, Integer singles, Integer doubles, Integer triples, Integer homeruns, Integer walks, Integer runs, Integer rbi) {
        this.atBats = atBats;
        this.hits = hits;
        this.singles = singles;
        this.doubles = doubles;
        this.triples = triples;
        this.homeruns = homeruns;
        this.walks = walks;
        this.runs = runs;
        this.rbi = rbi;
        this.avg = calculateAVG(hits, atBats);
        this.obp = calculateOBP(hits, atBats, walks);
        this.slg = calculateSLG(singles, doubles, triples, homeruns, atBats);
        this.ops = calculateOPS(obp, slg);
    }

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

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("gameList")
    private Player player;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("gamesList")
    private Result result;

    //region Helper Methods
    public static double calculateAVG(Integer hits, Integer atBats) {
        return (double) hits / (double) atBats;
    }
    public static double calculateOBP(Integer hits, Integer atBats, Integer walks) {
        return ((double) hits + (double) walks) / ((double) atBats + (double) walks);
    }
    public static double calculateSLG(Integer singles, Integer doubles, Integer triples, Integer homeruns, Integer atBats) {
        return (1*(double) singles + 2*(double) doubles + 3*(double) triples + 4*(double) homeruns) / (double) atBats;
    }
    public static double calculateOPS(double obp, double slg) {
        return obp + slg;
    }
    //endregion
}
