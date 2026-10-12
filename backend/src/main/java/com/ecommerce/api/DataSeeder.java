package com.ecommerce.api;

import com.ecommerce.api.model.Product;
import com.ecommerce.api.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository) {
        return args -> {
            List<Product> allProducts = new ArrayList<>();

            // 1. Electronics
            addProductIfMissing(productRepository, allProducts,
                "Premium Wireless Headphones",
                "High-quality noise-canceling wireless headphones with 30-hour battery life.",
                "299.99", 50,
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
                "Electronics"
            );

            // 2. Home
            addProductIfMissing(productRepository, allProducts,
                "Minimalist Desk Lamp",
                "Modern LED desk lamp with adjustable brightness and color temperature.",
                "89.50", 120,
                "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
                "Home"
            );

            // 3. Accessories
            addProductIfMissing(productRepository, allProducts,
                "Classic Leather Watch",
                "Elegant analog watch with genuine leather strap and water resistance.",
                "199.00", 30,
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
                "Accessories"
            );

            // 4. Electronics
            addProductIfMissing(productRepository, allProducts,
                "Smart Fitness Tracker",
                "Advanced fitness tracker with heart rate monitoring and sleep tracking.",
                "149.99", 85,
                "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
                "Electronics"
            );

            // 5. Home
            addProductIfMissing(productRepository, allProducts,
                "Ceramic Coffee Mug",
                "Handcrafted ceramic mug, perfect for your morning coffee or tea.",
                "24.00", 200,
                "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
                "Home"
            );

            // 6. Accessories
            addProductIfMissing(productRepository, allProducts,
                "Designer Sunglasses",
                "Stylish polarized sunglasses with UV protection.",
                "129.00", 60,
                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
                "Accessories"
            );

            // 7. Electronics (NEW)
            addProductIfMissing(productRepository, allProducts,
                "RGB Mechanical Keyboard",
                "Compact wireless mechanical keyboard with hot-swappable switches and customizable RGB lighting.",
                "119.00", 45,
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
                "Electronics"
            );

            // 8. Electronics (NEW)
            addProductIfMissing(productRepository, allProducts,
                "Portable Bluetooth Speaker",
                "Rugged waterproof speaker with 360-degree stereo sound and 24-hour playtime.",
                "79.99", 70,
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
                "Electronics"
            );

            // 9. Home (NEW)
            addProductIfMissing(productRepository, allProducts,
                "Aroma Diffuser & Humidifier",
                "Ultrasonic essential oil diffuser with ambient warm LED light and whisper-quiet operation.",
                "38.50", 95,
                "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80",
                "Home"
            );

            // 10. Home (NEW)
            addProductIfMissing(productRepository, allProducts,
                "Nordic Ceramic Flower Vase",
                "Handcrafted matte finish decorative vase perfect for dried florals and modern interior decor.",
                "42.00", 60,
                "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80",
                "Home"
            );

            // 11. Accessories (NEW)
            addProductIfMissing(productRepository, allProducts,
                "Slim Leather Cardholder",
                "Minimalist front pocket genuine leather wallet with built-in RFID blocking technology.",
                "39.00", 110,
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
                "Accessories"
            );

            // 12. Accessories (NEW)
            addProductIfMissing(productRepository, allProducts,
                "Insulated Steel Water Bottle",
                "Double-wall vacuum insulated stainless steel bottle keeping drinks icy cold for 24 hours.",
                "28.00", 150,
                "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
                "Accessories"
            );

            if (!allProducts.isEmpty()) {
                productRepository.saveAll(allProducts);
                System.out.println("Seeded " + allProducts.size() + " new products successfully!");
            }
        };
    }

    private void addProductIfMissing(ProductRepository repo, List<Product> list, 
                                     String name, String desc, String price, 
                                     int stock, String img, String cat) {
        boolean exists = repo.findAll().stream().anyMatch(p -> p.getName().equalsIgnoreCase(name));
        if (!exists) {
            Product p = new Product();
            p.setName(name);
            p.setDescription(desc);
            p.setPrice(new BigDecimal(price));
            p.setStockQuantity(stock);
            p.setImageUrl(img);
            p.setCategory(cat);
            list.add(p);
        }
    }
}
