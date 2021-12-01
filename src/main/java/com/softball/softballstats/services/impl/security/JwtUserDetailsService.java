package com.softball.softballstats.services.impl.security;

import com.softball.softballstats.domain.security.Account;
import com.softball.softballstats.domain.security.AccountPrincipal;
import com.softball.softballstats.domain.security.Role;
import com.softball.softballstats.services.impl.security.AccountServiceImpl;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private AccountServiceImpl accountService;

    public JwtUserDetailsService(AccountServiceImpl accountService) {
        this.accountService = accountService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountService.findAccountByUsername(username).get();
        if (account == null) {
            throw new UsernameNotFoundException(username);
        }
        return new AccountPrincipal(account);
    }
}
