package com.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.entities.Investor;
import com.app.entities.Transaction;
import com.app.repository.InvestorRepository;
import com.app.repository.TransactionRepository;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	private TransactionRepository transactionRepo;

	@Autowired
	private InvestorRepository investorRepo;
	
	@Override
	public Transaction createTransaction(Long investorID, Transaction transaction) {
		Investor investor = investorRepo.findById(investorID)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid investor id!!!"));
		transaction.setInvestor(investor);
		transaction.setTimestamp(LocalDateTime.now());
		return transactionRepo.save(transaction);
	}

	@Override
	public List<Transaction> getAllTransactions() {
		return transactionRepo.findAll();
	}

	@Override
	public List<Transaction> getTransactionsForCampaign(Long campaignId) {
		return transactionRepo.findByCampaignId(campaignId);
	}

	@Override
	public List<Transaction> getTransactionsForInvestor(Long investorId) {
		return transactionRepo.findByInvestorId(investorId);
	}

	@Override
	public Transaction getTransactionByPaypalPaymentId(String paymentId) {
		return transactionRepo.findByPaypalPaymentId(paymentId);
	}

}
