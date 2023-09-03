import axios from "axios";

const baseUrl = "http://localhost:8080/business"

class BusinessService {

    //Getting the business resource
    getAllBusiness() {
        return axios.get(baseUrl + "/businesses")
    }
    getCampaignsForBusiness(businessId) {
        return axios.get(baseUrl + "/" + businessId + "/campaign")
    }
    getBusinessInvestors(businessId) {
        return axios.get(baseUrl + "/" + businessId + "/investors")
    }
    getBusinessesForCategory(category) {
        return axios.get(baseUrl + "/" + category)
    }
    getAllCities() {
        return axios.get(baseUrl + "/cities");
    }
    //updating the business resource
    updateBusiness(business) {
        return axios.put(baseUrl + "/" + business.id, business)
    }
    updateCampaign(campaign) {
        return axios.put(baseUrl + "/campaign" + campaign.id, campaign)
    }
    approveBusiness(businessId) {
        return axios.put(baseUrl + "/" + businessId + "/approve")
    }
    approveCampaign(campaignId) {
        return axios.put(baseUrl + "/campaign" + campaignId + "/approve")
    }
    businessLogin(signin) {
        return axios.post(baseUrl + "/signin", signin)
    }
    //Creating Resource
    createBusiness(business) {
        return axios.post(baseUrl + "/signup", business)
    }
    createBusiness1(business) {
        return axios.post(baseUrl + "/signup", business)
    }
    createCampaign(businessId, campaign) {
       return axios.post(baseUrl + "/" + businessId + "/campaign", campaign)
        // return axios.post(`${baseUrl}/${businessId}/campaign`,campaign)
    }

    deleteBusiness(businessId) {
        return axios.delete(baseUrl + "/" + businessId)
    }
    deleteCampaign(campaignId) {
        return axios.delete(baseUrl + "/" + campaignId + "/campaign")
    }
}
export default new BusinessService();
///business/{category}