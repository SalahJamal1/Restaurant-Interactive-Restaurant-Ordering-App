package com.app.restaurant.auth;

import com.app.restaurant.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String access_token;
    private String refresh_token;
    private UserDto user;
}
