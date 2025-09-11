package com.app.restaurant.contracts;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
public class GenericServices<T, ID> implements IGenericServices<T, ID> {
    protected final JpaRepository<T, ID> repository;

    @Transactional
    @Override
    public void delete(ID id) {
        var entity = GetById(id);
        repository.delete(entity);
    }


    @Transactional
    @Override
    public T save(T entity) {
        return repository.save(entity);
    }


    @Override
    public List<T> saveAll(List<T> entity) {
        return repository.saveAll(entity);
    }

    @Override
    public T GetById(ID id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("We can not found the entity"));
    }

    @Override
    public List<T> findAll() {
            return repository.findAll();

    }
}
