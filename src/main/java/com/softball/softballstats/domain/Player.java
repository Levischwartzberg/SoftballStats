package com.softball.softballstats.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;
    private String lastName;
    private String birthdate;
    private String imageUrl;
    private String height;
    private Integer weight;
    private String batHand;
    private String throwHand;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Game> gameList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SeasonStats> seasonStatsList;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    LifetimeStats lifetimeStats;

    @ManyToMany
    private List<Position> positionList;
}
