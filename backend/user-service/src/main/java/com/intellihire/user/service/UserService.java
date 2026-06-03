package com.intellihire.user.service;

import com.intellihire.user.dto.UserRequestDto;
import com.intellihire.user.entity.UserProfile;
import com.intellihire.user.repository.UserRepository;
import com.intellihire.user.dto.UpdateUserDto;

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

    public UserProfile getUserById(
            Long id
    ){

        return userRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User Not Found"
                        )
                );
    }

    public UserProfile updateUser(
            Long id,
            UpdateUserDto dto
    ){

        UserProfile user =
                getUserById(id);

        user.setName(
                dto.getName()
        );

        user.setLocation(
                dto.getLocation()
        );

        user.setSummary(
                dto.getSummary()
        );

        return userRepository.save(
                user
        );
    }
}