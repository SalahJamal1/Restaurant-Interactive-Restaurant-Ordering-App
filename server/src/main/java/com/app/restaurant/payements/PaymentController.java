package com.app.restaurant.payements;


import com.app.restaurant.Item.Item;
import com.app.restaurant.Item.ItemService;
import com.app.restaurant.cart.Cart;
import com.app.restaurant.cart.CartService;
import com.app.restaurant.order.Orders;
import com.app.restaurant.order.OrdersService;
import com.app.restaurant.order.Status;
import com.app.restaurant.user.User;
import com.app.restaurant.user.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {
    private static final String GATEWAY_URL = "https://test-network.mtf.gateway.mastercard.com/api/rest/version/100/merchant/test12122024";
    private static final String API_USERNAME = "merchant.test12122024";
    private static final String API_PASSWORD = "0cb74bdcb05329641aa7bed1caff4e8a";
    private final OrdersService ordersService;
    private final CartService cartService;
    private final UserRepository userRepository;
    private final ItemService itemService;
    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/create-session")
    private ResponseEntity<?> createSession(@AuthenticationPrincipal User user, @RequestBody Orders orders) {
        String orderReference = UUID.randomUUID().toString();
        if (user != null) {
            orders.setBeforeSave(user);
            orders.setUser(user);
            for (Cart cart : orders.getCart()) {
                Item item = itemService.GetById(cart.getItem().getId());
                cart.setItem(item);
            }
            orders.setOrderReferences(orderReference);
            var cart = cartService.saveAll(orders.getCart());
            orders.setCart(cart);
            ordersService.save(orders);

        }
        String url = GATEWAY_URL + "/session";
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        httpHeaders.setBasicAuth(API_USERNAME, API_PASSWORD);

        Map<String, Object> session = Map.of(
                "apiOperation", "INITIATE_CHECKOUT",
                "checkoutMode", "WEBSITE",
                "interaction", Map.of(
                        "operation", "PURCHASE",
                        "merchant", Map.of(
                                "name", "Rest",
                                "url", "https://www.rest_front.com"
                        ),
                        "returnUrl", "http://localhost:8080/api/v1/payments/payment-status?status=success&orderReference=" + orderReference,
                        "cancelUrl", "http://localhost:8080/api/v1/payments/payment-status?status=cancel&orderReference=" + orderReference),
                "order", Map.of(
                        "currency", "USD",
                        "amount", orders.getOrderPrice(),
                        "id", orderReference,
                        "description", "Goods and Services")
        );
        HttpEntity<Map<String, Object>> httpEntity = new HttpEntity<>(session, httpHeaders);
        ResponseEntity<String> response = restTemplate.postForEntity(url, httpEntity, String.class);
        return ResponseEntity.ok().body(response.getBody());
    }

    @GetMapping("/payment-status")
    private ResponseEntity<?> checkPaymentStatus(@RequestParam String orderReference, @RequestParam String status) throws JsonProcessingException {
        Orders orders = ordersService.findByOrderReference(orderReference);
        try {
            if (status.equals("cancel")) {
                ordersService.delete(orders.getId());
                return ResponseEntity.status(HttpStatus.FOUND)
                        .header(HttpHeaders.LOCATION, "http://localhost:3000").build();
            }
            String url = GATEWAY_URL + "/order/" + orderReference;
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setBasicAuth(API_USERNAME, API_PASSWORD);
            HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            String result = jsonNode.path("result").path("gatewayCode").asText();
            String transactionId = jsonNode.path("transaction").get(0).path("transaction").path("id").asText();

            if ("CAPTURED".equalsIgnoreCase(result)) {
                orders.setStatus(Status.PAID);
                orders.setPaid(true);
                orders.setTransactionId(transactionId);
                ordersService.save(orders);

                return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, "http://localhost:3000").build();
            }
            ordersService.delete(orders.getId());
            return ResponseEntity.status(404).body("Order not found. Payment may have failed.");
        } catch (Exception e) {
            ordersService.delete(orders.getId());
            return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, "http://localhost:3000").build();
        }
    }
}
