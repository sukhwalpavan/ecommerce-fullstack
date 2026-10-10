package com.ecommerce.api;

import com.ecommerce.api.model.Product;
import com.ecommerce.api.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                Product p1 = new Product();
                p1.setName("Premium Wireless Headphones");
                p1.setDescription("High-quality noise-canceling wireless headphones with 30-hour battery life.");
                p1.setPrice(new BigDecimal("299.99"));
                p1.setStockQuantity(50);
                p1.setImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80");
                p1.setCategory("Electronics");

                Product p2 = new Product();
                p2.setName("Minimalist Desk Lamp");
                p2.setDescription("Modern LED desk lamp with adjustable brightness and color temperature.");
                p2.setPrice(new BigDecimal("89.50"));
                p2.setStockQuantity(120);
                p2.setImageUrl("https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80");
                p2.setCategory("Home");

                Product p3 = new Product();
                p3.setName("Classic Leather Watch");
                p3.setDescription("Elegant analog watch with genuine leather strap and water resistance.");
                p3.setPrice(new BigDecimal("199.00"));
                p3.setStockQuantity(30);
                p3.setImageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80");
                p3.setCategory("Accessories");

                Product p4 = new Product();
                p4.setName("Smart Fitness Tracker");
                p4.setDescription("Advanced fitness tracker with heart rate monitoring and sleep tracking.");
                p4.setPrice(new BigDecimal("149.99"));
                p4.setStockQuantity(85);
                p4.setImageUrl("https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80");
                p4.setCategory("Electronics");

                Product p5 = new Product();
                p5.setName("Ceramic Coffee Mug");
                p5.setDescription("Handcrafted ceramic mug, perfect for your morning coffee or tea.");
                p5.setPrice(new BigDecimal("24.00"));
                p5.setStockQuantity(200);
                p5.setImageUrl("https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80");
                p5.setCategory("Home");

                Product p6 = new Product();
                p6.setName("Designer Sunglasses");
                p6.setDescription("Stylish polarized sunglasses with UV protection.");
                p6.setPrice(new BigDecimal("129.00"));
                p6.setStockQuantity(60);
                p6.setImageUrl("https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80");
                p6.setCategory("Accessories");

                productRepository.saveAll(List.of(p1, p2, p3, p4, p5, p6));
                System.out.println("Dummy products seeded successfully!");
            }
        };
    }
}
