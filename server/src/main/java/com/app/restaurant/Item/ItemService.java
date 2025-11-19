package com.app.restaurant.Item;

import com.app.restaurant.contracts.GenericServices;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService extends GenericServices<Item, Integer> {
    private final ItemRepository repository;

    public ItemService(ItemRepository _repository) {
        super(_repository);
        repository = _repository;
    }


    public List<Item> findAllByCategory(String category) {
        return repository.findAllByCategory(category);
    }
}
