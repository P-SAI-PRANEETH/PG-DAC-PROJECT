package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Business;
import com.app.entities.Category;

public interface BusinessRepository extends JpaRepository<Business, Long> {

	Optional<Business> findByEmailAndPassword(String email, String password);
	Optional<Business> findByEmail(String email);
	List<Business> findByCategory(Category valueOf);

}
