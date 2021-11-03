package com.softball.softballstats.services;

import com.softball.softballstats.domain.Result;

import java.util.Date;
import java.util.Optional;

public interface ResultService {

    Iterable<Result> findAllResults();

    Optional<Result> findResultByDate(Date date);

    Optional<Result> findResultById(Integer id);

    Result saveResult(Result result);

    Result updateResult(Result result);

    void deleteResult(Result result);

    void deleteResult(Integer id);
}
