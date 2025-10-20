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
    private String deviceId;
    private boolean expired = false;
    private boolean revoked = false;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
