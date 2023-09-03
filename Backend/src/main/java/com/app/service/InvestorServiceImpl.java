package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.AuthRequest;
import com.app.dto.BusinessDto;
import com.app.dto.InvestorDto;
import com.app.entities.Business;
import com.app.entities.Investor;
import com.app.repository.AdminRepository;
import com.app.repository.InvestorRepository;

@Service
@Transactional
public class InvestorServiceImpl implements InvestorService {

	@Autowired
	private InvestorRepository investorRepo;

	@Autowired
	private AdminRepository adminRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public String updateInvestor(Long investorId, InvestorDto investorDto) {
		Investor existingInvestor = investorRepo.findById(investorId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid investor id!!!"));

		existingInvestor.setFirstName(investorDto.getFirstName());
		existingInvestor.setLastName(investorDto.getLastName());

		investorRepo.save(existingInvestor);
		return "Investor details updated successfully";
	}

	@Override
	public List<InvestorDto> getAllInvestors() {
		List<Investor> investors = investorRepo.findAll();
		List<InvestorDto> investorDtos = investors.stream().map((i) -> modelMapper.map(i, InvestorDto.class))
				.collect(Collectors.toList());
		return investorDtos;
	}

	@Override
	public String deleteInvestor(Long investorId) {
		Investor investor = investorRepo.findById(investorId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid investor id!!!"));
		investorRepo.delete(investor);
		return "Investor deleted successfully";
	}

	@Override
	public String createInvestor(InvestorDto investorDto) {
		Investor investor = modelMapper.map(investorDto, Investor.class);
		investor.setAdmin(adminRepo.findByName("Prashant Pandey"));
		investorRepo.save(investor);
		return "Investor created successfully";
	}

	@Override
	public List<BusinessDto> getInvestorBusinesses(Long investorId) {
		Investor investor = investorRepo.findById(investorId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid investor id!!!"));
		List<Business> businesses = investor.getBusinesses();
		List<BusinessDto> businessDtos = businesses.stream().map((b) -> modelMapper.map(b, BusinessDto.class))
				.collect(Collectors.toList());
		for (int i = 0; i < businesses.size(); i++) {
			businessDtos.get(i).setCity(businesses.get(i).getCity().getName());
			businessDtos.get(i).setState(businesses.get(i).getState().getName());
		}
		return businessDtos;
	}

	@Override
	public InvestorDto authenticate(AuthRequest request) {
		Investor investor = investorRepo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials , Invalid Login!!!"));
		return modelMapper.map(investor, InvestorDto.class);
	}
	
	@Override
	public void updateInvestor(Investor investor) {
		investorRepo.save(investor);
	}
}
