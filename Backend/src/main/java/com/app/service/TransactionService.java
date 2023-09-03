package com.app.service;

import java.util.List;

import com.app.entities.Transaction;

public interface TransactionService {

	Transaction createTransaction(Long investorId, Transaction transaction);
	List<Transaction> getAllTransactions();
	List<Transaction> getTransactionsForCampaign(Long campaignId);
	List<Transaction> getTransactionsForInvestor(Long investorId);
	Transaction getTransactionByPaypalPaymentId(String paymentId);

}
