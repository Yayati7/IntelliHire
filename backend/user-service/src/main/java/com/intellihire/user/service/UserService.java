package com.intellihire.user.service;

import com.intellihire.user.dto.UpdateUserDto;
import com.intellihire.user.dto.UserRequestDto;
import com.intellihire.user.entity.UserProfile;
import com.intellihire.user.repository.UserRepository;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
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

        UserProfile user =
                UserProfile.builder()

                        .name(dto.getName())
                        .email(dto.getEmail())
                        .location(dto.getLocation())
                        .summary(dto.getSummary())

                        .build();

        UserProfile savedUser =
                userRepository.save(user);

        log.info(
                "ACTION={} service={} user={} details={}",
                "PROFILE_CREATED",
                "USER-SERVICE",
                savedUser.getId(),
                "New user profile created"
        );

        return savedUser;

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

        UserProfile updatedUser =
                userRepository.save(
                        user
                );

        log.info(
                "ACTION={} service={} user={} details={}",
                "PROFILE_UPDATED",
                "USER-SERVICE",
                updatedUser.getId(),
                "User profile information updated"
        );

        return updatedUser;

    }

    public Map<String, Long> getUserCount(){

        return Map.of(

                "count",

                userRepository.count()

        );

    }
}