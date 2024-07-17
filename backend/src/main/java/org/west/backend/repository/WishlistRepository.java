package org.west.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.west.backend.model.WishedGame;

@Repository
public interface WishlistRepository extends MongoRepository<WishedGame, String> {
}
