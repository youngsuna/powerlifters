package com.appleground.powerlifters.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appleground.powerlifters.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>{
        
}
