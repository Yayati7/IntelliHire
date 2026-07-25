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

    public UserProfile createOrUpdateUser(
            Long id,
            UserRequestDto dto
    ) {

        UserProfile profile = userRepository.findById(id)
                .orElse(
                        UserProfile.builder()
                                .id(id)
                                .build()
                );

        // Merge: only overwrite a field if the caller actually sent it.
        // This lets a lightweight "ensure profile exists" call
        // coexist with the full Profile-page save
        // without wiping existing values.

        if (dto.getName() != null && !dto.getName().isBlank()) {
            profile.setName(dto.getName());
        }

        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            profile.setEmail(dto.getEmail());
        }

        if (dto.getLocation() != null) {
            profile.setLocation(dto.getLocation());
        }

        if (dto.getSummary() != null) {
            profile.setSummary(dto.getSummary());
        }

        UserProfile saved = userRepository.save(profile);

        log.info(
                "ACTION={} service={} user={} details={}",
                "PROFILE_SAVED",
                "USER-SERVICE",
                saved.getId(),
                "Profile created or updated"
        );

        return saved;

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