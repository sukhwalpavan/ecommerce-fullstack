package com.ecommerce.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping({"/", "/api", "/api/health"})
    public ResponseEntity<Map<String, Object>> rootHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "AuraStore API Backend");
        response.put("version", "1.0.0");
        response.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(response);
    }
}
