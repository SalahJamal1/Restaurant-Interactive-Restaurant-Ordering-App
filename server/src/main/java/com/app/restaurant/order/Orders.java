package com.app.restaurant.order;


import com.app.restaurant.cart.Cart;
import com.app.restaurant.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "customer_name")
    private String customerName;

    @OneToMany(cascade = {CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<Cart> cart;
    @Column(name = "address")
    private String address;
    @Column(name = "estimated_delivery")
    private Timestamp estimatedDelivery;
    @Column(name = "actual_delivery")
    private Timestamp actualDelivery;
    @Column(name = "order_price")
    @NotNull
    private double orderPrice;
    @Column(name = "phone")
    private String phone;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;


    public void setBeforeSave(User user) {
        this.estimatedDelivery = Timestamp.from(Instant.now().plus(15, ChronoUnit.MINUTES));
        this.status = Status.Preparing;
        this.customerName = user.getFirstName() + " " + user.getLastName();
        this.address = user.getAddress();
        this.phone = user.getPhone();
    }

    @Transactional
    public void markAsDelivered() {
        this.actualDelivery = Timestamp.from(Instant.now());
        this.status = Status.Delivered;
    }

    public void addCart(List<Cart> carts) {
        cart = carts;
    }
}
