package com.app.restaurant.cart;

import com.app.restaurant.Item.Item;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
    @Column(name = "quantity")
    @NotNull
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
    @NotNull
    @Column(name = "total_price")
    private double totalPrice;
}
