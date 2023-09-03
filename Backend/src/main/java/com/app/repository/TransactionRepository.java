package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByInvestorId(Long investorId);
	List<Transaction> findByCampaignId(Long campaignId);
	Transaction findByPaypalPaymentId(String paymentId);

}
