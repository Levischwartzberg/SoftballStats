package com.softball.softballstats.domain.security;

import com.softball.softballstats.services.impl.security.AccountServiceImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public class CustomAuthenticationManager implements AuthenticationManager {

    private AccountServiceImpl accountService;

    public CustomAuthenticationManager(AccountServiceImpl accountService) {
        this.accountService = accountService;
    }

    @Override
    public Authentication authenticate(Authentication auth) throws AuthenticationException {
        if(accountService.findAccountByCredentials(auth.getPrincipal() + "", auth.getCredentials() + "").isPresent()) {
            List<GrantedAuthority> AUTHORITIES = new ArrayList<>();

            AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_USER"));
            Account account = accountService.findAccountByUsername(auth.getName()).get();

            if (auth.getCredentials().equals(account.getPassword())) {
                AUTHORITIES.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                return new UsernamePasswordAuthenticationToken(auth.getName(),
                        auth.getCredentials(), AUTHORITIES);
            }
        }
//        throw new BadCredentialsException("Bad Credentials");
        return new UsernamePasswordAuthenticationToken(auth.getName(), auth.getCredentials());
    }

}
