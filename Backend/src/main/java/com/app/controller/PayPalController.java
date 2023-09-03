package com.app.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/paypal")
@CrossOrigin(origins = "http://localhost:3000")
public class PayPalController {

	@GetMapping("/callback")
	public String handlePayPalCallback() {
		return "Payment successful";
	}
	
	@GetMapping("/cancel")
	public String handlePaypalCancel() {
	    return "cancel";
	}
}
