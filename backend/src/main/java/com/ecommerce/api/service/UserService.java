package com.ecommerce.api.service;

import com.ecommerce.api.model.User;
import com.ecommerce.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        String normalizedEmail = user.getEmail() != null ? user.getEmail().trim().toLowerCase() : "";
        user.setEmail(normalizedEmail);
        if (user.getName() != null) {
            user.setName(user.getName().trim());
        }

        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new RuntimeException("An account with this email already exists. Please log in instead.");
        }
        // In a real app, hash password here (e.g. BCrypt)
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        String normalizedEmail = email != null ? email.trim().toLowerCase() : "";
        Optional<User> user = userRepository.findByEmail(normalizedEmail);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        throw new RuntimeException("Invalid credentials");
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
