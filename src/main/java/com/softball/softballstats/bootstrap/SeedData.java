package com.softball.softballstats.bootstrap;

import com.softball.softballstats.domain.*;
import com.softball.softballstats.domain.security.Account;
import com.softball.softballstats.domain.security.Role;
import com.softball.softballstats.services.AccountService;
import com.softball.softballstats.utils.DateUtils;

import com.softball.softballstats.services.PlayerService;
import com.softball.softballstats.services.SeasonService;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SeedData implements ApplicationListener<ContextRefreshedEvent>{

    PlayerService playerService;
    SeasonService seasonService;
    AccountService accountService;

    public SeedData(PlayerService playerService, SeasonService seasonService, AccountService accountService) {
        this.playerService = playerService;
        this.seasonService = seasonService;
        this.accountService = accountService;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

//        Season season1 = new Season();
//        season1.setSession("Summer");
//        season1.setYear(2021);
//
//        Season season2 = new Season();
//        season2.setSession("Fall");
//        season2.setYear(2021);
//
//        List<Result> resultList1 = new ArrayList<>();
//        List<Result> resultList2 = new ArrayList<>();
//
//        Result result1 = new Result();
//        result1.setResult("Win");
//        result1.setScore("14-12");
//        result1.setDate(DateUtils.parseDate("2021", "05", "08","18", "15"));
//
//        Result result2 = new Result();
//        result2.setResult("Win");
//        result2.setScore("13-8");
//        result2.setDate(DateUtils.parseDate("2021", "05", "15", "18", "00"));
//
//        Result result3 = new Result();
//        result3.setResult("Loss");
//        result3.setScore("13-12");
//        result3.setDate(DateUtils.parseDate("2021", "10", "18", "18", "00"));
//
//        Game game1 = new Game(3,4,3,1,0,1,1,0,2,4);
//        Game game2 = new Game(3,4,2,1,1,0,0,0,2,2);
//        Game game3 = new Game(1,3,3,3,0,0,0,1,3,1);
//        Game game4 = new Game(1,4,1,0,1,0,0,0,1,1);
//
//        Game game5 = new Game(3,4,2,1,1,0,0,0,2,0);
//        Game game6 = new Game(1,3,2,1,0,0,1,1,3,4);
//
//        List<Game> gamesList1 = new ArrayList<>();
//        gamesList1.add(game1); gamesList1.add(game3);
//        result1.setGamesList(gamesList1);
//
//        List<Game> gamesList2 = new ArrayList<>();
//        gamesList2.add(game2); gamesList2.add(game4);
//        result2.setGamesList(gamesList2);
//
//        List<Game> gamesList3 = new ArrayList<>();
//        gamesList3.add(game5); gamesList3.add(game6);
//        result3.setGamesList(gamesList3);
//
//        resultList1.add(result1); resultList1.add(result2);
//        season1.setResultList(resultList1);
//
//        resultList2.add(result3);
//        season2.setResultList(resultList2);
//
//        Player player1 = new Player();
//        player1.setFirstName("Socks");
//        player1.setLastName("Seybold");
//        player1.setHeight("5'11");
//        player1.setWeight(175);
//        player1.setThrowHand("Right");
//        player1.setBatHand("Right");
//        List<Game> gameList1 = new ArrayList<>();
//        gameList1.add(game1);
//        gameList1.add(game2);
//        gameList1.add(game5);
//        player1.setGameList(gameList1);
//
//        Player player2 = new Player();
//        player2.setFirstName("Burt");
//        player2.setLastName("Jigworth");
//        player2.setHeight("6'2");
//        player2.setWeight(195);
//        player2.setThrowHand("Right");
//        player2.setBatHand("Right");
//        List<Game> gameList2 = new ArrayList<>();
//        gameList2.add(game3);
//        gameList2.add(game4);
//        gameList2.add(game6);
//        player2.setGameList(gameList2);
//
//        playerService.savePlayer(player1);
//        playerService.savePlayer(player2);
//        seasonService.saveSeason(season1);
//        seasonService.saveSeason(season2);

//        Account adminAccount = new Account();
//        adminAccount.setUsername("admin");
//        adminAccount.setPassword("qwe123");
//
//        Role role = new Role();
//        role.setRole("admin");
//
//        HashSet<Role> roles = new HashSet<>();
//
//        roles.add(role);
//
//        adminAccount.setRoles(roles);
//
//        accountService.saveAccount(adminAccount);
    }
}
