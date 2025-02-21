package com.app.restaurant.shawarma;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShawarmaImpService implements ShawarmaService {
    private final ShawarmaRepository repository;

    @Override
    @Transactional
    public void delete(Shawarma entity) {
        repository.delete(entity);
    }

    @Override
    @Transactional
    public Shawarma save(Shawarma entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Shawarma> findById(Integer id) {
        return Optional.of(repository.findById(id).orElseThrow(() -> new RuntimeException("We can not found the entity")));
    }

    public List<Shawarma> findAll() {
        try {
            return repository.findAll();
        } catch (AuthenticationException
                err) {
            throw new RuntimeException("You are not authenticated");
        }
    }
}
