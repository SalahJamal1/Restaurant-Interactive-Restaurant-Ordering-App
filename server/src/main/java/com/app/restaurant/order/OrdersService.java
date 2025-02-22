package com.app.restaurant.order;

import java.util.List;

public interface OrdersService {

    void delete(Orders entity);

    Orders save(Orders entity);

    Orders findById(Integer id);

    List<Orders> findAll();

}
