package com.app.restaurant.Item;

import java.util.List;
import java.util.Optional;

public interface ItemService {

    void delete(Item entity);

    Item save(Item entity);

    List<Item> saveAll(List<Item> entity);

    Optional<Item> findById(Integer id);

    List<Item> findAll();
}
