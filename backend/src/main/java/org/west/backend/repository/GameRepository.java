package org.west.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.west.backend.model.Game;

@Repository
public interface GameRepository extends MongoRepository<Game, Integer> {
}
