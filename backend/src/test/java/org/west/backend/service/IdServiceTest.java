package org.west.backend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.*;

class IdServiceTest {

    private IdService idService;

    @BeforeEach
     void setUp() {
        idService = new IdService(); // Initialisieren Sie das IdService-Objekt
    }

    @Test
    void idGenerator_shouldReturn() {
        String id = idService.idGenerator();

        assertFalse(id.isEmpty(),"Die generierte ID sollte nicht leer sein");

        assertTrue(id.matches("^[0-9a-fA-F-]{36}$"), "Die generierte ID sollte das UUID-Format haben");
    }
}