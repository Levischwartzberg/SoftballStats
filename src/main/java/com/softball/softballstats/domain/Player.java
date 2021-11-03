package com.softball.softballstats.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    private String firstName;
    private String lastName;
    private String birthdate;
    private String imageUrl;
    private String height;
    private Integer weight;
    private String batHand;
    private String throwHand;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="player")
    @JsonIgnoreProperties("player")
    private List<Game> gameList;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SeasonStats> seasonStatsList;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private LifetimeStats lifetimeStats;

    @ManyToMany
    private List<Position> positionList;

    public void setGameList(List<Game> gameList) {
        this.gameList = gameList;
        for (Game game : gameList) {
            game.setPlayer(this);
        }
    }
}
