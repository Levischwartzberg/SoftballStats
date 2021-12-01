package com.softball.softballstats.domain.security;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "Role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    private String Role;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
    private Set<Account> accounts = new HashSet<>();
}
