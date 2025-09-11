package com.app.restaurant.Item;

import com.app.restaurant.contracts.GenericServices;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService extends GenericServices<Item, Integer> {
    public ItemService(ItemRepository repository) {
        super(repository);
    }


    public List<Item> findAllByCategory(String category) {
        return ((ItemRepository) super.repository).findAllByCategory(category);
    }
}
