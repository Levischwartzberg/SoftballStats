package com.softball.softballstats.controllers;

import com.softball.softballstats.domain.Account;
import com.softball.softballstats.services.AccountService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AccountController {

    private AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/")
    public String performLogin(@RequestBody Account account) {
        if(accountService.findAccountByCredentials(account.getUsername(), account.getPassword()).isPresent()) {
            if(accountService.findAccountByCredentials(account.getUsername(), account.getPassword()).get().getRole().equals("admin")) {
                return "hasAdminPrivileges";
            }
        }
        return "invalidCredentials";
    }
}
