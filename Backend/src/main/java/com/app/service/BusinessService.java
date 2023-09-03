package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AuthRequest;
import com.app.dto.BusinessDto;
import com.app.dto.InvestorDto;
import com.app.entities.City;

public interface BusinessService {

	String updateBusiness(Long businessId, BusinessDto business);
	List<BusinessDto> getAllBusinesses();
	String deleteBusiness(Long businessId);
	String approveBusiness(Long businessId);
	List<InvestorDto> getBusinessInvestors(Long businessId);
	BusinessDto authenticate(AuthRequest request);
	List<BusinessDto> getBusinessByCategory(String category);
	String createBusiness(BusinessDto business);
	String uploadImage(MultipartFile file,String email) throws IOException;
	List<City> getAllCities();
}
