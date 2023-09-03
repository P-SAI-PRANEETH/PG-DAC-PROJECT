package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ApiResponse;
import com.app.dto.AuthRequest;
import com.app.dto.InvestorDto;
import com.app.entities.Transaction;
import com.app.service.InvestorService;
import com.app.service.PaymentService;
import com.app.service.TransactionService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

@RestController
@RequestMapping("/investor")
@CrossOrigin(origins = "http://localhost:3000")
public class InvestorController {

	@Autowired
	private InvestorService investorService;

	@Autowired
	private TransactionService transactionService;

	@Autowired
	private PaymentService paymentService;

	@PostMapping("/signin")
	public ResponseEntity<?> investorLogin(@RequestBody AuthRequest request) {
		return new ResponseEntity<>(investorService.authenticate(request), HttpStatus.OK);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> createInvestor(@RequestBody @Valid InvestorDto investor) {
		return new ResponseEntity<>(investorService.createInvestor(investor), HttpStatus.CREATED);
	}

	@GetMapping("/investors")
	public ResponseEntity<?> getAllInvestors() {
		return new ResponseEntity<>(investorService.getAllInvestors(), HttpStatus.OK);
	}

	@PutMapping("/{investorId}")
	public ResponseEntity<?> updateInvestor(@PathVariable Long investorId, @RequestBody @Valid InvestorDto investor) {
		return new ResponseEntity<>(new ApiResponse(investorService.updateInvestor(investorId, investor)),
				HttpStatus.OK);
	}

	@DeleteMapping("/{investorId}")
	public ResponseEntity<?> deleteInvestor(@PathVariable Long investorId) {
		return new ResponseEntity<>(new ApiResponse(investorService.deleteInvestor(investorId)), HttpStatus.OK);
	}

	@GetMapping("/{investorId}/businesses")
	public ResponseEntity<?> getInvestorBusinesses(@PathVariable Long investorId) {
		return new ResponseEntity<>(investorService.getInvestorBusinesses(investorId), HttpStatus.OK);
	}

	@PostMapping("/{investorId}/transaction")
	public ResponseEntity<?> createTransaction(@PathVariable Long investorId,
			@RequestBody @Valid Transaction transaction) throws PayPalRESTException {
		Payment payment = paymentService.createPayment(transaction.getAmount(), "USD",
				"http://localhost:3000/paypal/callback", "http://localhost:3000/paypal/cancel");
		transaction.setPaypalPaymentId(payment.getId());
		return new ResponseEntity<>(transactionService.createTransaction(investorId, transaction), HttpStatus.CREATED);
	}

	@GetMapping("/{investorId}/transaction")
	public ResponseEntity<?> getTransactionsForInvestor(@PathVariable Long investorId) {
		return new ResponseEntity<>(transactionService.getTransactionsForInvestor(investorId), HttpStatus.OK);
	}

	@GetMapping("/campaign/{campaignId}/transaction")
	public ResponseEntity<?> getTransactionsForCampaign(@PathVariable Long campaignId) {
		return new ResponseEntity<>(transactionService.getTransactionsForCampaign(campaignId), HttpStatus.OK);
	}

	@GetMapping("/transactions")
	public ResponseEntity<?> getAllTransactions() {
		return new ResponseEntity<>(transactionService.getAllTransactions(), HttpStatus.OK);
	}
}
