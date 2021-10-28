package com.softball.softballstats.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class SeasonStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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

    @ManyToOne
    private Season season;
}
