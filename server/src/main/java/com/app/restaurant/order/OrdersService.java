package com.app.restaurant.order;

import com.app.restaurant.contracts.IGenericServices;

import java.util.List;


public interface OrdersService extends IGenericServices<Orders, Integer> {
    Orders findByIdAndMarkAsDelivered(Integer id);

    List<Orders> findAllOrdersAndMarkAsDelivered();

    Orders findByOrderReference(String orderReference);

}
