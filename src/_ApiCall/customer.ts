import axios from "axios";
const tokenExpiry = async()=>{
    try{
        const response= await axios.get("https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/customers/",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data.token_expiry_on;
    }
    catch(error){
        console.log(error);
    }
}
export {
    tokenExpiry
}