package com.app.restaurant.burger;

import java.util.List;
import java.util.Optional;

public interface BurgerService {

    void delete(Burger entity);

    Burger save(Burger entity);

    Optional<Burger> findById(Integer id);

    List<Burger> findAll();
}
