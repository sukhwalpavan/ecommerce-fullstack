package com.ecommerce.api.controller;

import com.ecommerce.api.model.Product;
import com.ecommerce.api.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        
        if (search != null && !search.isEmpty()) {
            return ResponseEntity.ok(productService.searchProducts(search));
        } else if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(productService.getProductsByCategory(category));
        }
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategoryPath(@PathVariable String category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }
}
