package com.app.restaurant.shawarma;

import java.util.List;
import java.util.Optional;

public interface ShawarmaService {

    void delete(Shawarma entity);

    Shawarma save(Shawarma entity);

    Optional<Shawarma> findById(Integer id);

    List<Shawarma> findAll();
}
