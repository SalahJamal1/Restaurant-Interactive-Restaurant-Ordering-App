package com.app.restaurant.token;

import com.app.restaurant.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "token")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String accessToken;
    private String refreshToken;
    @Enumerated(EnumType.STRING)
    private TokenType tokenType;
    private String ipAddress;
    private String deviceName;
    private String deviceId;
    private boolean expired;
    private boolean revoked;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
