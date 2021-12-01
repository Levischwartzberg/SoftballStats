package com.softball.softballstats.configuration;

import com.softball.softballstats.services.AccountService;
import com.softball.softballstats.services.impl.security.AccountServiceImpl;
import com.softball.softballstats.services.impl.security.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtTokenUtil;

    private final JwtUserDetailsService userDetailsService;
    private final AccountServiceImpl accountService;

    public JwtTokenFilter(AccountServiceImpl accountService) {
        this.accountService = accountService;
        this.userDetailsService = new JwtUserDetailsService(accountService);
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            if (jwt != null && jwtTokenUtil.validateJwtToken(jwt)) {
                String username = jwtTokenUtil.getUserNameFromJwtToken(jwt);

                List<GrantedAuthority> AUTHORITIES = new ArrayList<>();
                AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, AUTHORITIES);


                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));


                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            System.out.println("Cannot set authentication: " + e);
        }
        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return header.substring(7, header.length());
        }
        return null;
    }
}
