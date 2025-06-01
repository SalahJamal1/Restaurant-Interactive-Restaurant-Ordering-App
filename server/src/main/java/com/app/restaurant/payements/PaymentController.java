package com.app.restaurant.payements;


import com.app.restaurant.Item.Item;
import com.app.restaurant.Item.ItemService;
import com.app.restaurant.cart.Cart;
import com.app.restaurant.cart.CartService;
import com.app.restaurant.order.Orders;
import com.app.restaurant.order.OrdersService;
import com.app.restaurant.user.User;
import com.app.restaurant.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
            for (Cart cart : orders.getCart()) {
                Item item = itemService.findById(cart.getItem().getId()).orElseThrow(() -> new RuntimeException("item is not exist"));
                cart.setItem(item);
            }
            orders.setOrderReferences(orderReference);
            cartService.saveAll(orders.getCart());
            user.getOrders().add(orders);
            userRepository.save(user);
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
                                "name", "Family Tree",
                                "url", "https://www.familytree.com"
                        ),
                        "returnUrl", "https://www.familytree.com/api/v1/payment/payment-status?status=success&orderReference=" + orderReference,
                        "cancelUrl", "https://www.familytree.com/api/v1/payment/payment-status?status=cancel&orderReference=" + orderReference),
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
}
