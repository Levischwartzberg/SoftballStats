package com.softball.softballstats.repositories;

import com.softball.softballstats.domain.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepo extends CrudRepository<Account, Integer> {

    Optional<Account> findAccountByUsernameAndPassword(String username, String password);
}
