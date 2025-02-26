package com.app.restaurant.menu;

import java.util.List;

public interface MenuService {


    List<Menu> findAll();

    Menu findByCategory(String category);
}
