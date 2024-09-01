package com.appleground.powerlifters.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appleground.powerlifters.entity.FavoriteEntity;
import com.appleground.powerlifters.entity.primaryKey.FavoritePK;


@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePK>{
    
}
