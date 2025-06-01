package com.app.restaurant.Item;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/item")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService service;

    @GetMapping
    public List<Item> list() {

        return service.findAll();

    }

    @GetMapping("/{id}")
    public Item getItem(@PathVariable Integer id) {
        return service.findById(id).orElseThrow();
    }

    @PostMapping
    public List<Item> createItems(@RequestBody List<Item> entity) {
        return service.saveAll(entity);
    }

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Integer id) {
        Item entity = service.findById(id).orElseThrow();

        service.delete(entity);
        return "you are deleted the Id: " + id;
    }

    @PatchMapping("/{id}")
    public Item updateItem(@PathVariable Integer id, @RequestBody Item entity1) {
        Item entity = service.findById(id).orElseThrow();
        entity.setDescription(entity1.getDescription());
        entity.setName(entity1.getName());
        entity.setImageUrl(entity1.getImageUrl());
        entity.setUnitPrice(entity1.getUnitPrice());

        service.save(entity);
        return entity;
    }
}
