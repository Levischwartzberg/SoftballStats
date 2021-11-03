package com.softball.softballstats.repositories;

import com.softball.softballstats.domain.Result;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.Optional;

public interface ResultRepo extends CrudRepository<Result, Integer> {

    Optional<Result> findResultByDate(Date date);

}