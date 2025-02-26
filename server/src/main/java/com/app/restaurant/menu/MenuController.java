package com.app.restaurant.menu;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menu")
@RequiredArgsConstructor
public class MenuController {
    private final MenuService service;

    @GetMapping
    public List<Menu> menu() {
        return service.findAll();

    }

    @GetMapping("/{category}")
    public Menu menus(@PathVariable String category) {
        System.out.println(category);
        return service.findByCategory(category);

    }


}
