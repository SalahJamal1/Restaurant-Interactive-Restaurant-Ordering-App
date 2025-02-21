package com.app.restaurant.shawarma;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shawarma")
@RequiredArgsConstructor
public class ShawarmaController {
    private final ShawarmaService service;

    @GetMapping
    public List<Shawarma> list() {

        return service.findAll();

    }

    @GetMapping("/{id}")
    public Shawarma getShawarma(@PathVariable Integer id) {
        return service.findById(id).orElseThrow();
    }

    @PostMapping
    public Shawarma createShawarma(@RequestBody Shawarma entity) {
        return service.save(entity);
    }

    @DeleteMapping("/{id}")
    public String deleteShawarma(@PathVariable Integer id) {
        Shawarma entity = service.findById(id).orElseThrow();

        service.delete(entity);
        return "you are deleted the Id: " + id;
    }

    @PatchMapping("/{id}")
    public Shawarma updateShawarma(@PathVariable Integer id, @RequestBody Shawarma entity1) {
        Shawarma entity = service.findById(id).orElseThrow();
        entity.setDescription(entity1.getDescription());
        entity.setName(entity1.getName());
        entity.setImageUrl(entity1.getImageUrl());
        entity.setUnitPrice(entity1.getUnitPrice());

        service.save(entity);
        return entity;
    }
}
