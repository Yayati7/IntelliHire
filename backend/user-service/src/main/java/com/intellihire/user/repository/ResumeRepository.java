package com.intellihire.user.repository;

import com.intellihire.user.entity.Resume;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository
        extends JpaRepository<Resume,Long> {
    List<Resume> findByUserId(
            Long userId
    );
}