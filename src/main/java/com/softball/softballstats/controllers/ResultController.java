package com.softball.softballstats.controllers;

import com.softball.softballstats.domain.Result;
import com.softball.softballstats.services.ResultService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/result")
public class ResultController {

    private ResultService resultService;

    public ResultController(ResultService resultService) {this.resultService = resultService;}

    @GetMapping("/")
    public Iterable<Result> findAllResults() {
        return resultService.findAllResults();
    }

    @GetMapping("/{id}")
    public Result findResultById(@PathVariable Integer id) {
        return resultService.findResultById(id).get();
    }

    @PostMapping("/")
    public ResponseEntity<Result> addResult(@RequestBody Result result) {
        return new ResponseEntity<>(resultService.saveResult(result), HttpStatus.CREATED);
    }

    @PutMapping("/")
    public ResponseEntity<Result> updateResult(@RequestBody Result result) {
        return new ResponseEntity<>(resultService.updateResult(result), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/")
    public void deleteResult(@RequestBody Result result) {
        resultService.deleteResult(result);
    }

    @DeleteMapping("/{id}")
    public void deleteResultById(@PathVariable Integer id) {
        resultService.deleteResult(id);
    }
}
