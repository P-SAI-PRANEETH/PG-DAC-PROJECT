package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {

	List<Campaign> findByBusinessId(Long businessId);

}
