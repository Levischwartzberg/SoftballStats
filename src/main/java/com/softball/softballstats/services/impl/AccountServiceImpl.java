package com.softball.softballstats.services.impl;

import com.softball.softballstats.domain.Account;
import com.softball.softballstats.repositories.AccountRepo;
import com.softball.softballstats.services.AccountService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    private AccountRepo accountRepo;

    public AccountServiceImpl(AccountRepo accountRepo) {
        this.accountRepo = accountRepo;
    }

    @Override
    public Optional<Account> findAccountByCredentials(String username, String password) {
        return accountRepo.findAccountByUsernameAndPassword(username, password);
    }

    @Override
    public void saveAccount(Account account) {
        accountRepo.save(account);
    }
}
