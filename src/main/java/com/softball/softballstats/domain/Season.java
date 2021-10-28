package com.softball.softballstats.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Season {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String session;
    private Integer year;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SeasonStats> seasonStatsList;
}
