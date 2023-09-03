import axios from "axios";
const baseUrl="http://localhost:8080/admin"
class AdminService{
    
    getAllAdmins(){
        return axios.get(baseUrl+"/admins")
    }
    updateAdmin(admin){
        return axios.put(baseUrl+"/"+admin.id,admin)
    }
    adminLogin(signin){
        return axios.post(baseUrl+"/signin",signin)
    }
    deleteAdmmin(adminId){
        return axios.delete(baseUrl+"/"+adminId)
    }
}
export default new AdminService();