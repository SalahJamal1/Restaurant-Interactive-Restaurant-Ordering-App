package com.app.restaurant.order;

import com.app.restaurant.contracts.GenericServices;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrdersService extends GenericServices<Orders, Integer> {
    public OrdersRepository repository;

    public OrdersService(OrdersRepository _repository) {
        super(_repository);
        repository = _repository;
    }


    public Orders findByIdAndMarkAsDelivered(Integer id) {
        Orders orders = repository.findById(id).orElseThrow(() -> new RuntimeException("We can not found the entity"));
        orders.markAsDelivered();
        return repository.save(orders);

    }

    @Transactional
    public List<Orders> findOrdersByUserId(Integer userId) {
        repository.UpdateActualDelivery(userId);
        return repository.findOrdersByUserId(userId);
    }

    public Orders findByOrderReference(String orderReference) {
        return repository.findOrdersByOrderReferences(orderReference);


    }


}
