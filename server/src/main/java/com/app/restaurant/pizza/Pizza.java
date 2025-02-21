package com.app.restaurant.pizza;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pizzas")
public class Pizza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String Name;
    @Column(name = "unit_price")
    private float unitPrice;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "ingredients")
    @JsonSerialize
    @JsonDeserialize
    private String ingredients;

}
