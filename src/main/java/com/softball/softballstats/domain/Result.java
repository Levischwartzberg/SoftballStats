package com.softball.softballstats.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String result;
    private String score;
    private Date date;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "result")
    @JsonIgnoreProperties("result")
    @OrderColumn
    private List<Game> gamesList;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties("resultList")
    private Season season;

    public void setGamesList(List<Game> gamesList) {
        this.gamesList = gamesList;
        for (Game game : gamesList) {
            game.setResult(this);
        }
    }
}
