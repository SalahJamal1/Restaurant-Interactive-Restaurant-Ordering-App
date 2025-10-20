package com.app.restaurant.auth;

import com.app.restaurant.user.Role;
import jakarta.validation.constraints.AssertTrue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthRegister {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String phone;
    private String confirmPassword;
    private Role role;

    @AssertTrue(message = "The password doesn't match")
    public boolean isPasswordMatch() {
        return password.equals(confirmPassword);
    }

}
