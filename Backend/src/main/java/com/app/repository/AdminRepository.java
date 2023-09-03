package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

	Optional<Admin> findByEmailAndPassword(String email, String password);
	Admin findByName(String string);
	Optional<Admin> findByEmail(String email);

}
