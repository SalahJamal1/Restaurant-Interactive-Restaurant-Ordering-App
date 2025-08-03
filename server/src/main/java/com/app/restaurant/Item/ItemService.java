package com.app.restaurant.Item;

import com.app.restaurant.contracts.GenericServices;
import org.springframework.stereotype.Service;

@Service
public class ItemService extends GenericServices<Item, Integer> {
    public ItemService(ItemRepository repository) {
        super(repository);
    }

}
