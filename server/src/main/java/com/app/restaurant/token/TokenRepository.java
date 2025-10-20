package com.app.restaurant.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    @Transactional
    @Modifying
    @Query("""
            UPDATE Token t SET t.expired=true ,t.revoked=true 
            where t.user.id=:userId and t.deviceId=:deviceId and 
                        (t.expired=false and t.revoked=false )
            """)
    int UpdateAllValidTokenByUserAndDeviceId(Integer userId, String deviceId);

    Optional<Token> findByRefreshToken(String refreshToken);

    Optional<Token> findTokenByAccessToken(String accessToken);
}
