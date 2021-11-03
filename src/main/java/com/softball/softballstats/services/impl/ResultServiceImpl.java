package com.softball.softballstats.services.impl;

import com.softball.softballstats.domain.Result;
import com.softball.softballstats.repositories.ResultRepo;
import com.softball.softballstats.services.ResultService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class ResultServiceImpl implements ResultService {

    private ResultRepo resultRepo;

    public ResultServiceImpl(ResultRepo resultRepo) {this.resultRepo = resultRepo;}

    @Override
    public Iterable<Result> findAllResults() {
        return resultRepo.findAll();
    }

    @Override
    public Optional<Result> findResultByDate(Date date) {
        return resultRepo.findResultByDate(date);
    }

    @Override
    public Optional<Result> findResultById(Integer id) {
        return resultRepo.findById(id);
    }

    @Override
    public Result saveResult(Result result) {
        return resultRepo.save(result);
    }

    @Override
    public Result updateResult(Result result) {
        return resultRepo.save(result);
    }

    @Override
    public void deleteResult(Result result) {
        resultRepo.delete(result);
    }

    @Override
    public void deleteResult(Integer id) {
        resultRepo.deleteById(id);
    }
}
