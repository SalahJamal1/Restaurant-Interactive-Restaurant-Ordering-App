package com.app.restaurant.menu;


import com.app.restaurant.Item.Item;
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
    private String category;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_id")
    private List<Item> items;
}
