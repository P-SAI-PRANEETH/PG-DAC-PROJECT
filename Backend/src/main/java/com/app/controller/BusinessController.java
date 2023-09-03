package com.app.controller;

import java.io.IOException;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.dto.AuthRequest;
import com.app.dto.BusinessDto;
import com.app.entities.Campaign;
import com.app.service.BusinessService;
import com.app.service.CampaignService;

@RestController
@RequestMapping("/business")
@CrossOrigin(origins = "http://localhost:3000")
public class BusinessController {

	@Autowired
	private BusinessService businessService;

	@Autowired
	private CampaignService campaignService;

	@PostMapping("/signin")
	public ResponseEntity<?> businessLogin(@RequestBody AuthRequest request) {
		return new ResponseEntity<>(businessService.authenticate(request), HttpStatus.OK);
	}
	
     @PostMapping("/signup")
     public ResponseEntity<?> createBusiness(@RequestBody BusinessDto business){
    	return new ResponseEntity<>(new ApiResponse(businessService.createBusiness(business)),HttpStatus.ACCEPTED);
     }
     //http://localhost:8080/business/image/${values.email}/uploadImage
     @PostMapping("/image/{email}/uploadImage")
     public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file,@PathVariable String email) throws IOException{
    	 return new ResponseEntity<>(new ApiResponse(businessService.uploadImage(file,email)),HttpStatus.ACCEPTED );
     }
	@GetMapping("/businesses")
	public ResponseEntity<?> getAllBusinesses() {
		return new ResponseEntity<>(businessService.getAllBusinesses(), HttpStatus.OK);
	}
	
	@GetMapping("/{category}")
	public ResponseEntity<?>getBusinessesForCategory(@PathVariable String category){
		return new ResponseEntity<>(businessService.getBusinessByCategory(category),HttpStatus.OK);
	}
	
	@PutMapping("/{businessId}")
	public ResponseEntity<?> updateBusiness(@PathVariable Long businessId, @RequestBody @Valid BusinessDto business) {
		return new ResponseEntity<>(new ApiResponse(businessService.updateBusiness(businessId, business)),
				HttpStatus.OK);
	}
	
	@DeleteMapping("/{businessId}")
	public ResponseEntity<?> deleteBusiness(@PathVariable Long businessId) {
		return new ResponseEntity<>(new ApiResponse(businessService.deleteBusiness(businessId)), HttpStatus.OK);
	}
	
	@GetMapping("/{businessId}/campaign")
	public ResponseEntity<?> getCampaignsForBusiness(@PathVariable Long businessId) {
		return new ResponseEntity<>(campaignService.getCampaignsForBusiness(businessId), HttpStatus.OK);
	}
	
	@GetMapping("/{businessId}/investors")
	public ResponseEntity<?> getBusinessInvestors(@PathVariable Long businessId) {
		return new ResponseEntity<>(businessService.getBusinessInvestors(businessId), HttpStatus.OK);
	}
	
	@PostMapping("/{businessId}/approve")
	public ResponseEntity<?> approveBusiness(@PathVariable Long businessId) {
		return new ResponseEntity<>(new ApiResponse(businessService.approveBusiness(businessId)), HttpStatus.OK);
	}
	
	@PostMapping("/{businessId}/campaign")
	public ResponseEntity<?> createCampaign(@PathVariable Long businessId, @RequestBody @Valid Campaign campaign) {
		return new ResponseEntity<>(new ApiResponse(campaignService.createCampaign(businessId, campaign)), HttpStatus.CREATED);
	}
	
	@PutMapping("/campaign/{campaignId}")
	public ResponseEntity<?> updateCampaign(@PathVariable Long campaignId, @RequestBody @Valid Campaign campaign) {
		return new ResponseEntity<>(new ApiResponse(campaignService.updateCampaign(campaignId, campaign)),
				HttpStatus.CREATED);
	}

	@DeleteMapping("/campaign/{campaignId}")
	public ResponseEntity<?> deleteCampaign(@PathVariable Long campaignId) {
		return new ResponseEntity<>(new ApiResponse(campaignService.deleteCampaign(campaignId)), HttpStatus.OK);
	}

	@GetMapping("/campaigns")
	public ResponseEntity<?> getAllCampaigns() {
		return new ResponseEntity<>(campaignService.getAllCampaigns(), HttpStatus.OK);
	}

	@PostMapping("/campaign/{campaignId}/approve")
	public ResponseEntity<?> approveCampaign(@PathVariable Long campaignId) {
		return new ResponseEntity<>(new ApiResponse(campaignService.approveCampaign(campaignId)), HttpStatus.OK);
	}	
	@GetMapping("/cities")
	public ResponseEntity<?> getAllCities() {
		return new ResponseEntity<>(businessService.getAllCities(), HttpStatus.OK);
	}
	
}
