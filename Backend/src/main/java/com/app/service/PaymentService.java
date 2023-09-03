package com.app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.paypal.api.payments.Amount;
import com.paypal.api.payments.Payer;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.RedirectUrls;
import com.paypal.api.payments.Transaction;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
@Component
public class PaymentService {
    private static final String CLIENT_ID = "AekK0HKvcYiPNQKz1EpJ50Cn5Xtylpm5qv0zJw23-fZVxVyOBVflPMRuTPsQZSip2sJ-iDpCt_YPba7q";
    private static final String CLIENT_SECRET = "EGjpl9nNRWr-gc8b2ijxr5m9zZJ2yVGkIQAOGgMtjUmloCKZZGCai1g9wQdsRagxLdOoRrmF0PuudoOZ";
    private static final String MODE = "sandbox";

    public Payment createPayment(double amount, String currency, String returnUrl, String cancelUrl) throws PayPalRESTException {
        APIContext apiContext = new APIContext(CLIENT_ID, CLIENT_SECRET, MODE);

        Amount paymentAmount = new Amount();
        paymentAmount.setCurrency(currency);
        paymentAmount.setTotal(String.format("%.2f", amount));

        Transaction transaction = new Transaction();
        transaction.setAmount(paymentAmount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        payment.setRedirectUrls(new RedirectUrls().setReturnUrl(returnUrl).setCancelUrl(cancelUrl));

        return payment.create(apiContext);
    }
}
