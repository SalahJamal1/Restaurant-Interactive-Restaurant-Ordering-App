package com.app.restaurant.menu;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class MenuImpRepository implements MenuRepository {
    private final EntityManager entityManager;


    @Override
    public Menu findAll() {
        TypedQuery<Menu> query = entityManager.createQuery(
                "SELECT m FROM Menu m " +
                        "LEFT JOIN m.shawarma s " +
                        "LEFT JOIN m.pizza p " +
                        "LEFT JOIN m.burger b", Menu.class);

        return query.getSingleResult();
    }
}
