package com.app.restaurant.menu;

import com.app.restaurant.contracts.IGenericServices;

public interface MenuService extends IGenericServices<Menu, Integer> {

    Menu findByCategory(String category);
}
