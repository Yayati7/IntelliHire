package com.intellihire.user.service;

import com.intellihire.user.dto.UserRequestDto;
import com.intellihire.user.entity.UserProfile;
import com.intellihire.user.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    public UserProfile createUser(
            UserRequestDto dto
    ) {

        UserProfile user = UserProfile.builder()

                .name(dto.getName())
                .email(dto.getEmail())
                .location(dto.getLocation())
                .summary(dto.getSummary())

                .build();

        return userRepository.save(user);
    }

    public List<UserProfile> getAllUsers(){

        return userRepository.findAll();
    }
}