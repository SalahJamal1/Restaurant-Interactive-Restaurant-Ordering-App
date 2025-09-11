package com.app.restaurant.user.dto;

import com.app.restaurant.order.Orders;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Integer id;
    private String firstName;

    private String lastName;

    private String email;


    private String address;


    private String phone;

    private List<Orders> orders;


}
