package com.softball.softballstats.services;

import com.softball.softballstats.domain.security.Account;

import java.util.Optional;

public interface AccountService {

    Optional<Account> findAccountByUsername(String username);
    Optional<Account> findAccountByCredentials(String username, String password);

    void saveAccount(Account account);
}
