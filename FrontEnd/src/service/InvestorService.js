import axios from "axios";
const baseUrl="http://localhost:8080/investor"
class InvestorService{
    //GETTING INVESTOR RESOURCES
    getAllInvestors(){
        return  axios.get(baseUrl+"/investors")
    }
    getAllTrasanctions(){
        return   axios.get(baseUrl+"/transactions")
    }
    getTransactionsForInvestor(investorId){
        return axios.get(baseUrl+"/"+investorId+"/transaction")
    }
    getTransactionsForCampaign(campaignId){
        return    axios.get(baseUrl+"/campaign"+campaignId+"/transaction")
    }
    getInvestorBusinesses(investorId){
        return axios.get(baseUrl+"/"+investorId+"/businesses")
    }
    //UPDATING INVESTOR RESOURCES
    updateInvestor(investor){
        return   axios.put(baseUrl+"/"+investor.id,investor)
    }

    //DELETING INVESTOR RESOURCES
    deleteInvestor(investorId){
        return    axios.delete(baseUrl+"/"+investorId);
    }

    //CREATING INVESTOR RESOURCES
    createInvestor(investor){
        return     axios.post(baseUrl+ "/signup", investor )
    }
    createTransaction(investorId,transaction){
        return axios.post(baseUrl+"/"+investorId+"/transaction"+transaction)
    }
    //LOGIN
    investorLogin(signin){
        return axios.post(baseUrl+"/signin",signin)
    }
}
export default new InvestorService();