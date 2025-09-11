package com.app.restaurant.order;

import com.app.restaurant.contracts.GenericServices;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class OrdersService extends GenericServices<Orders, Integer> {
    public OrdersService(OrdersRepository repository) {
        super(repository);
    }


    public Orders findByIdAndMarkAsDelivered(Integer id) {
        Orders orders = repository.findById(id).orElseThrow(() -> new RuntimeException("We can not found the entity"));
        orders.markAsDelivered();
        return repository.save(orders);

    }

    public List<Orders> findAllOrdersAndMarkAsDelivered() {
        try {
            for (Orders order : repository.findAll()) {
                if (order.getActualDelivery() == null && Instant.now().isAfter(order.getEstimatedDelivery().toInstant())) {
                    order.markAsDelivered();
                    repository.save(order);
                }
            }
            return repository.findAll();
        } catch (AuthenticationException
                err) {
            throw new RuntimeException("You are not authenticated");
        }
    }

    public Orders findByOrderReference(String orderReference) {
        return ((OrdersRepository) super.repository).findOrdersByOrderReferences(orderReference);


    }


}
