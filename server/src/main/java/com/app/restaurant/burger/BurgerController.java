package com.app.restaurant.burger;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/burger")
@RequiredArgsConstructor
public class BurgerController {
    private final BurgerService service;

    @GetMapping
    public List<Burger> list() {

        return service.findAll();

    }

    @GetMapping("/{id}")
    public Burger getBurger(@PathVariable Integer id) {
        return service.findById(id).orElseThrow();
    }

    @PostMapping
    public Burger createBurger(@RequestBody Burger entity) {
        return service.save(entity);
    }

    @DeleteMapping("/{id}")
    public String deleteBurger(@PathVariable Integer id) {
        Burger entity = service.findById(id).orElseThrow();

        service.delete(entity);
        return "you are deleted the Id: " + id;
    }

    @PatchMapping("/{id}")
    public Burger updateBurger(@PathVariable Integer id, @RequestBody Burger entity1) {
        Burger entity = service.findById(id).orElseThrow();
        entity.setIngredients(entity.getIngredients());
        entity.setName(entity1.getName());
        entity.setImageUrl(entity1.getImageUrl());
        entity.setUnitPrice(entity1.getUnitPrice());

        service.save(entity);
        return entity;
    }
}
