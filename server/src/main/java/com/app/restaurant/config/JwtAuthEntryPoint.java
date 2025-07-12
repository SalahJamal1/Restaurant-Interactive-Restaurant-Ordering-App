package com.app.restaurant.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException)
            throws IOException, ServletException {
        response.setStatus((HttpStatus.UNAUTHORIZED.value()));
        response.setContentType("application/json");
        ObjectMapper  objectMapper = new ObjectMapper();
        Map<String, Object> map = new LinkedHashMap<>();
        map.put(("status"), HttpStatus.UNAUTHORIZED.value());
        map.put(("message"), authException.getMessage());
    objectMapper.writeValue(response.getWriter(), map);

    }
}
