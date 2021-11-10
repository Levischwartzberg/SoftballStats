package com.softball.softballstats.domain.VO;

import com.softball.softballstats.domain.Game;
import com.softball.softballstats.domain.Player;
import com.softball.softballstats.domain.Result;
import com.softball.softballstats.domain.Season;
import lombok.Data;

import java.util.List;

@Data
public class BoxscoreVO {

    private List<Player> playerList;
    private Season season;
    private List<Game> gameList;
    private Result result;

}
