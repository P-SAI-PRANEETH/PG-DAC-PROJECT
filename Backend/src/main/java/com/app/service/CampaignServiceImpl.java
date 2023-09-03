package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.entities.Business;
import com.app.entities.Campaign;
import com.app.repository.BusinessRepository;
import com.app.repository.CampaignRepository;

@Service
@Transactional
public class CampaignServiceImpl implements CampaignService {

	@Autowired
	private CampaignRepository campaignRepo;
	@Autowired
	private BusinessRepository businessRepo;

	@Override
	public List<Campaign> getAllCampaigns() {
		return campaignRepo.findAll();
	}

	@Override
	public String createCampaign(Long businessId, Campaign campaign) {
		Business business = businessRepo.findById(businessId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid business id!!!"));
		campaign.setBusiness(business);
		campaignRepo.save(campaign);
		return "Campaign created successfully";
	}

	@Override
	public String updateCampaign(Long campaignId, Campaign campaign) {
		Campaign existingCampaign = campaignRepo.findById(campaignId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid campaign id!!!"));
		existingCampaign.setTitle(campaign.getTitle());
		existingCampaign.setDescription(campaign.getDescription());
		existingCampaign.setGoalAmount(campaign.getGoalAmount());
		existingCampaign.setEndDate(campaign.getEndDate());
		campaignRepo.save(existingCampaign);
		return "Campaign updated successfully";
	}

	@Override
	public String deleteCampaign(Long id) {
		Campaign campaign = campaignRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid campaign id!!!"));
		campaignRepo.delete(campaign);
		return "Campaign deleted successfully";
	}

	@Override
	public String approveCampaign(Long campaignId) {
		Campaign campaign = campaignRepo.findById(campaignId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid campaign id!!!"));
		campaign.setApproved(true);
		campaignRepo.save(campaign);
		return "Campaign approved successfully";
	}

	@Override
	public List<Campaign> getCampaignsForBusiness(Long businessId) {
		return campaignRepo.findByBusinessId(businessId);
	}

	@Override
	public Campaign getCampaignById(Long campaignId) {
		return campaignRepo.findById(campaignId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid campaign id!!!"));
	}
	
	@Override
	public void updateCampaign(Campaign campaign) {
		campaignRepo.save(campaign);
	}

}
