-- PostgreSQL Schema for AuraStore E-Commerce Platform

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER'
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100)
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    shipping_address TEXT NOT NULL,
    CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Seed Products Data (12 Products)
INSERT INTO products (name, description, price, stock_quantity, image_url, category) VALUES
('Premium Wireless Headphones', 'High-quality noise-canceling wireless headphones with 30-hour battery life.', 299.99, 50, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'Electronics'),
('Minimalist Desk Lamp', 'Modern LED desk lamp with adjustable brightness and color temperature.', 89.50, 120, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80', 'Home'),
('Classic Leather Watch', 'Elegant analog watch with genuine leather strap and water resistance.', 199.00, 30, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 'Accessories'),
('Smart Fitness Tracker', 'Advanced fitness tracker with heart rate monitoring and sleep tracking.', 149.99, 85, 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80', 'Electronics'),
('Ceramic Coffee Mug', 'Handcrafted ceramic mug, perfect for your morning coffee or tea.', 24.00, 200, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', 'Home'),
('Designer Sunglasses', 'Stylish polarized sunglasses with UV protection.', 129.00, 60, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', 'Accessories'),
('RGB Mechanical Keyboard', 'Compact wireless mechanical keyboard with hot-swappable switches and customizable RGB lighting.', 119.00, 45, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80', 'Electronics'),
('Portable Bluetooth Speaker', 'Rugged waterproof speaker with 360-degree stereo sound and 24-hour playtime.', 79.99, 70, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80', 'Electronics'),
('Aroma Diffuser & Humidifier', 'Ultrasonic essential oil diffuser with ambient warm LED light and whisper-quiet operation.', 38.50, 95, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80', 'Home'),
('Nordic Ceramic Flower Vase', 'Handcrafted matte finish decorative vase perfect for dried florals and modern interior decor.', 42.00, 60, 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80', 'Home'),
('Slim Leather Cardholder', 'Minimalist front pocket genuine leather wallet with built-in RFID blocking technology.', 39.00, 110, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80', 'Accessories'),
('Insulated Steel Water Bottle', 'Double-wall vacuum insulated stainless steel bottle keeping drinks icy cold for 24 hours.', 28.00, 150, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80', 'Accessories')
ON CONFLICT DO NOTHING;
