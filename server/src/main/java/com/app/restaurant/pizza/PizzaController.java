package com.app.restaurant.pizza;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pizza")
@RequiredArgsConstructor
public class PizzaController {
    private final PizzaService service;

    @GetMapping
    public List<Pizza> list() {

        return service.findAll();

    }

    @GetMapping("/{id}")
    public Pizza getPizza(@PathVariable Integer id) {
        return service.findById(id).orElseThrow();
    }

    @PostMapping
    public Pizza createPizza(@RequestBody Pizza entity) {
        return service.save(entity);
    }

    @DeleteMapping("/{id}")
    public String deletePizza(@PathVariable Integer id) {
        Pizza entity = service.findById(id).orElseThrow();

        service.delete(entity);
        return "you are deleted the Id: " + id;
    }

    @PatchMapping("/{id}")
    public Pizza updatePizza(@PathVariable Integer id, @RequestBody Pizza entity1) {
        Pizza entity = service.findById(id).orElseThrow();
        entity.setIngredients(entity.getIngredients());
        entity.setName(entity1.getName());
        entity.setImageUrl(entity1.getImageUrl());
        entity.setUnitPrice(entity1.getUnitPrice());

        service.save(entity);
        return entity;
    }
}
