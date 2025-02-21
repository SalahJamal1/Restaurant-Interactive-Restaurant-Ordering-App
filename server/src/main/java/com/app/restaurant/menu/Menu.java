package com.app.restaurant.menu;


import com.app.restaurant.burger.Burger;
import com.app.restaurant.pizza.Pizza;
import com.app.restaurant.shawarma.Shawarma;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "menu")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_id")
    private List<Shawarma> shawarma;
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_id")
    private List<Pizza> pizza;
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_id")
    private List<Burger> burger;


}
