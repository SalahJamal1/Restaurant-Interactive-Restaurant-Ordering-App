package com.app.restaurant.contracts;

import java.util.List;

public interface IGenericServices<T, ID> {

    void delete(ID id);

    T save(T entity);

    List<T> saveAll(List<T> entity);


    T GetById(ID id);

    List<T> findAll();
}
