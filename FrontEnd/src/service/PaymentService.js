import axios from "axios";
const baseUrl = "http://localhost:8080/investor"

class PaymentService {
    createTransaction(transaction) {
        let investorId=1;
        console.log(investorId,transaction)
       // console.log(transaction);
        return axios.post(baseUrl + "/" + investorId + "/transaction", transaction)
    }
}
export default new PaymentService();
