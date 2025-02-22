package com.app.restaurant.cart;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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
    @Column(name = "name")
    @NotBlank
    private String name;
    @Column(name = "unit_price")
    @NotNull
    private double unitPrice;
    @Column(name = "image_url")
    @NotBlank
    private String imageUrl;
    @Column(name = "ingredients")
    @NotBlank
    private String ingredients;
    @Column(name = "quantity")
    @NotNull
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;
    @NotNull
    @Column(name = "total_price")
    private double totalPrice;
}
