package com.softball.softballstats.controllers;

import com.softball.softballstats.configuration.JwtUtils;
import com.softball.softballstats.domain.security.Account;
import com.softball.softballstats.domain.security.CustomAuthenticationManager;
import com.softball.softballstats.domain.security.JwtResponse;
import com.softball.softballstats.services.impl.security.AccountServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/login")
public class AccountController {

    private AccountServiceImpl accountService;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    public AccountController(AccountServiceImpl accountService, JwtUtils jwtUtils) {
        this.accountService = accountService;
        this.authenticationManager = new CustomAuthenticationManager(accountService);
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/")
    public ResponseEntity<?> performLogin(@RequestBody @Valid Account account) throws Exception {
        try {
            Account account1 = new Account();
            UsernamePasswordAuthenticationToken authReq = new UsernamePasswordAuthenticationToken(account.getUsername(), account.getPassword());
            if(accountService.findAccountByUsername(account.getUsername()).isPresent()) {
                account1 = accountService.findAccountByUsername(account.getUsername()).get();
                authReq = new UsernamePasswordAuthenticationToken(account.getUsername(), account.getPassword());
            }

            Authentication authentication = authenticationManager.authenticate(authReq);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            final String token = jwtUtils.generateJwtToken(authReq);

            System.out.println(SecurityContextHolder.getContext().getAuthentication().getAuthorities());

            return (SecurityContextHolder.getContext().getAuthentication().isAuthenticated() ) ?
                ResponseEntity.ok(new JwtResponse(token, account1.getUsername(), account1.getId(), true)) : ResponseEntity.ok("Not authorized");
        } catch (Exception e) {
            System.out.println(e);
            throw new Exception(e);
        }
    }
}
