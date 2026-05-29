package com.intellihire.user.repository;

import com.intellihire.user.entity.UserProfile;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<UserProfile,Long> {

}