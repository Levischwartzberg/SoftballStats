package com.softball.softballstats.domain.security;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class JwtResponse {

    private String jwtToken;
    private String username;
    private Integer id;
    private boolean admin;

    public JwtResponse(String jwtToken, String username, Integer id, boolean admin) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.id = id;
        this.admin = admin;
    }
}
