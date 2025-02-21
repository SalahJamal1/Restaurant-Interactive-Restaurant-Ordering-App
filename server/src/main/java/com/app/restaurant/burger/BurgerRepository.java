package com.app.restaurant.burger;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BurgerRepository extends JpaRepository<Burger, Integer> {
}
