package com.app.restaurant.Item;



import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService service;

    @GetMapping
    public List<Item> findAll(@RequestParam String category) {
        return service.findAllByCategory(category);

    }




}
