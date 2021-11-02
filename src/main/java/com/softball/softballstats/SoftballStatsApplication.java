package com.softball.softballstats;

import com.softball.softballstats.domain.Game;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class SoftballStatsApplication {

    public static void main(String[] args) {SpringApplication.run(SoftballStatsApplication.class, args);}

}
