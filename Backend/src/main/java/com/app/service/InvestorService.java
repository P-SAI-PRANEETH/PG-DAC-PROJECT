package com.app.service;

import java.util.List;

import com.app.dto.AuthRequest;
import com.app.dto.BusinessDto;
import com.app.dto.InvestorDto;
import com.app.entities.Investor;

public interface InvestorService {

	String updateInvestor(Long investorId, InvestorDto investor);
	List<InvestorDto> getAllInvestors();
	List<BusinessDto> getInvestorBusinesses(Long investorId);
	String deleteInvestor(Long investorId);
	String createInvestor(InvestorDto investor);
	InvestorDto authenticate(AuthRequest request);
	void updateInvestor(Investor investor);

}
