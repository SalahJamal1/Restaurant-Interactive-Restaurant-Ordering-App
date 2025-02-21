package com.app.restaurant.pizza;

import java.util.List;
import java.util.Optional;

public interface PizzaService {

    void delete(Pizza entity);

    Pizza save(Pizza entity);

    Optional<Pizza> findById(Integer id);

    List<Pizza> findAll();
}
