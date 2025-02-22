package com.app.restaurant.order;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrdersImpService implements OrdersService {
    private final OrdersRepository repository;

    @Override
    @Transactional
    public void delete(Orders entity) {
        repository.delete(entity);
    }

    @Override
    @Transactional
    public Orders save(Orders entity) {
        System.out.println(entity);
        return repository.save(entity);
    }

    @Override
    public Orders findById(Integer id) {
        Optional<Orders> optional = repository.findById(id);
        if (optional.isPresent()) {

            optional.get().markAsDelivered();
            repository.save(optional.get());
            return optional.get();
        } else throw new RuntimeException("We cannot found the entity");
    }

    public List<Orders> findAll() {
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


}
