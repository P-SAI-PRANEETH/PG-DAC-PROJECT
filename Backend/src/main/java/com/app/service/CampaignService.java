package com.app.service;

import java.util.List;
import com.app.entities.Campaign;

public interface CampaignService {

	List<Campaign> getAllCampaigns();
	String createCampaign(Long businessId, Campaign campaign);
	String updateCampaign(Long campagignId, Campaign campaign);
	String deleteCampaign(Long id);
	String approveCampaign(Long campaignId);
	List<Campaign> getCampaignsForBusiness(Long businessId);
	Campaign getCampaignById(Long campaignId);
	void updateCampaign(Campaign campaign);

}
