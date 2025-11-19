package com.app.restaurant.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    Orders findOrdersByOrderReferences(String orderReference);

    @Modifying
    @Transactional
    @Query("""
            UPDATE Orders o SET o.actualDelivery=CURRENT_TIMESTAMP,o.status=com.app.restaurant.order.Status.Delivered
             WHERE o.user.id=:userId AND o.actualDelivery IS NULL 
            AND CURRENT_TIMESTAMP>o.estimatedDelivery 
            """)
    int UpdateActualDelivery(@Param("userId") Integer userId);

    List<Orders> findOrdersByUserId(Integer userId);
}
