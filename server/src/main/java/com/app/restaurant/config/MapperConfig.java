package com.app.restaurant.config;

import com.app.restaurant.user.User;
import com.app.restaurant.user.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MapperConfig {

    UserDto toUserDto(User user);
}
