package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.State;

public interface StateRepository extends JpaRepository<State, Long> {

	State findByName(String state);

}
