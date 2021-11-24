package com.softball.softballstats.services;

import com.softball.softballstats.domain.Account;

import java.util.Optional;

public interface AccountService {

    Optional<Account> findAccountByCredentials(String username, String password);

    void saveAccount(Account account);
}
