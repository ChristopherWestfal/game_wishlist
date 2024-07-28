package org.west.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import org.west.backend.model.Game;

import java.util.List;

@Repository
public interface GameRepository extends MongoRepository<Game, Integer> {

    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<Game> findByName(String namePart);
}
