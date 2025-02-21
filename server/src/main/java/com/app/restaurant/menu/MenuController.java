package com.app.restaurant.menu;


import com.app.restaurant.burger.Burger;
import com.app.restaurant.burger.BurgerService;
import com.app.restaurant.pizza.Pizza;
import com.app.restaurant.pizza.PizzaService;
import com.app.restaurant.shawarma.Shawarma;
import com.app.restaurant.shawarma.ShawarmaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menu")
@RequiredArgsConstructor
public class MenuController {
    private final MenuService service;
    private final ShawarmaService shawarmaService;
    private final BurgerService burgerService;
    private final PizzaService pizzaService;

    @GetMapping
    public Menu menu() {
        return service.findAll();

    }

    @GetMapping("/shawarma")
    public List<Shawarma> shawarma() {
        return shawarmaService.findAll();

    }

    @GetMapping("/pizza")
    public List<Pizza> pizzas() {

        return pizzaService.findAll();

    }

    @GetMapping("/burger")
    public List<Burger> burgers() {
        return burgerService.findAll();

    }


}
