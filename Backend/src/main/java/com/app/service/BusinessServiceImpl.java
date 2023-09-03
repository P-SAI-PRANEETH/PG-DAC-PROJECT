package com.app.service;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.AuthRequest;
import com.app.dto.BusinessDto;
import com.app.dto.InvestorDto;
import com.app.entities.Business;
import com.app.entities.Category;
import com.app.entities.City;
import com.app.entities.Investor;
import com.app.repository.AdminRepository;
import com.app.repository.BusinessRepository;
import com.app.repository.CityRepository;
import com.app.repository.StateRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class BusinessServiceImpl implements BusinessService {

	@Autowired
	private BusinessRepository businessRepo;

	@Autowired
	private AdminRepository adminRepo;

	@Autowired
	private StateRepository stateRepo;

	@Autowired
	private CityRepository cityRepo;

	@Autowired
	private ObjectMapper objMapper;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public String updateBusiness(Long businessId, BusinessDto business) {
		Business existingBusiness = businessRepo.findById(businessId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid business id!!!"));
		existingBusiness.setCompanyName(business.getCompanyName());
		existingBusiness.setCompanyDescription(business.getCompanyDescription());
		businessRepo.save(existingBusiness);
		return "Business" + existingBusiness.getCompanyName() + "'s  details updated successfully!";
	}

	@Override
	public List<BusinessDto> getAllBusinesses() {
		List<Business> businesses = businessRepo.findAll();
		List<BusinessDto> businessDtos = businesses.stream().map((b) -> modelMapper.map(b, BusinessDto.class))
				.collect(Collectors.toList());

		
		Path path = null;
		for (BusinessDto b : businessDtos) {
			path = Paths.get(
					"D:\\DAC\\project\\01\\RewardBasedCrowdFunding\\RewardBasedCrowdFunding\\src\\main\\resources\\static\\images\\"+b.getImageFileName());
			try {
				b.setArr(Files.readAllBytes(path));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				System.out.println("file not found");
			}
		}

		for (int i = 0; i < businesses.size(); i++) {
			businessDtos.get(i).setCity(businesses.get(i).getCity().getName());
			businessDtos.get(i).setState(businesses.get(i).getState().getName());
		}

		return businessDtos;
	}

	@Override
	public String deleteBusiness(Long businessId) {
		Business business = businessRepo.findById(businessId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid business id!!!"));
		businessRepo.delete(business);
		return "Business " + business.getCompanyName() + "'s  details deleted!";
	}

	@Override
	public String approveBusiness(Long businessId) {
		Business business = businessRepo.findById(businessId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid business id!!!"));
		business.setApproved(true);
		businessRepo.save(business);
		return "Business " + business.getCompanyName() + " approved successfully";
	}

	@Override
	public List<InvestorDto> getBusinessInvestors(Long businessId) {
		Business business = businessRepo.findById(businessId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid business id!!!"));
		List<Investor> investors = business.getInvestors();
		List<InvestorDto> investorDtos = investors.stream().map((i) -> modelMapper.map(i, InvestorDto.class))
				.collect(Collectors.toList());
		return investorDtos;
	}

	@Override
	public BusinessDto authenticate(AuthRequest request) {
		Business business = businessRepo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials , Invalid Login!!!"));
		return modelMapper.map(business, BusinessDto.class);
	}

	@Override
	public List<BusinessDto> getBusinessByCategory(String category) {
		List<Business> businesses = businessRepo.findByCategory(Category.valueOf(category.toUpperCase()));
		List<BusinessDto> businessDtos = businesses.stream().map((b) -> modelMapper.map(b, BusinessDto.class))
				.collect(Collectors.toList());
		
		Path path = null;
		for (BusinessDto b : businessDtos) {
			path = Paths.get(
					"D:\\DAC\\project\\01\\RewardBasedCrowdFunding\\RewardBasedCrowdFunding\\src\\main\\resources\\static\\images\\"+b.getImageFileName());
			try {
				b.setArr(Files.readAllBytes(path));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				System.out.println("file not found");
			}
		}
		
		
		for (int i = 0; i < businesses.size(); i++) {
			businessDtos.get(i).setCity(businesses.get(i).getCity().getName());
			businessDtos.get(i).setState(businesses.get(i).getState().getName());
		}
		return businessDtos;
	}

	@Override
	public String createBusiness(BusinessDto businessDto) {
		Business business1 = modelMapper.map(businessDto, Business.class);
		business1.setCity(cityRepo.findByName(businessDto.getCity()));
		business1.setState(stateRepo.findByName(businessDto.getState()));
		business1.setAdmin(adminRepo.findByName("mohanish"));
		businessRepo.save(business1);
		return "data uploaded successfully";
	}

	@Override
	public String uploadImage(MultipartFile file, String email) throws IOException {
		Business business = businessRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid business id!!!"));
		if (file.isEmpty()) {
			System.out.println("file is empty");
		} else {
			business.setImageFileName(file.getOriginalFilename());
			try {
				Path filePath = Path.of(
						"D:\\DAC\\project\\01\\RewardBasedCrowdFunding\\RewardBasedCrowdFunding\\src\\main\\resources\\static\\images",
						file.getOriginalFilename());
				Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
				String fileName = file.getOriginalFilename();
				business.setImageFileName(fileName);
                businessRepo.save(business);
			} catch (UncheckedIOException e) {
				System.out.println("");
			}
		}
		return "new image is uploaded successfully";
	}

	@Override
	public List<City> getAllCities() {
		return cityRepo.findAll();
	}
}
