package com.softball.softballstats.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="season")
    private List<Result> resultList;

    public void setResultList(List<Result> resultList) {
        this.resultList = resultList;
        for (Result result : resultList) {
            result.setSeason(this);
        }
    }
}
