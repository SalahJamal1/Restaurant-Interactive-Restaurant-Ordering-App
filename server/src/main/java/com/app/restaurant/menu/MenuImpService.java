package com.app.restaurant.menu;

import com.app.restaurant.contracts.GenericServices;
import org.springframework.stereotype.Service;

@Service
public class MenuImpService extends GenericServices<Menu, Integer> implements MenuService {
    public MenuImpService(MenuRepository repository) {
        super(repository);
    }

    @Override
    public Menu findByCategory(String category) {
        return ((MenuRepository) super.repository).findByCategory(category);
    }
}
