package com.app.restaurant.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query("""
            select t from Token  t inner join User u on t.user.id=u.id
            where u.id=:userId and t.deviceId=:deviceId and (t.expired=false and t.revoked=false )
            """)
    List<Token> findAllValidTokenByUserAndDeviceId(Integer userId, String deviceId);

    Optional<Token> findByRefreshToken(String token);
}
