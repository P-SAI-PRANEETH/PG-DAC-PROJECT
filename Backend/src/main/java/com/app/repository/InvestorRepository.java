package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Investor;

public interface InvestorRepository extends JpaRepository<Investor, Long> {

	Optional<Investor> findByEmail(String email);
	Optional<Investor> findByEmailAndPassword(String email, String password);

}
