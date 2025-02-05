import axios from "axios";
// to get the variable id of the restaurant
const restVarId = async () => {
   try {
    const response = await fetch("https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/restaurants/1/");
    const data = await response.json();
    return data.var_id;
   } catch (error) {
    console.error(error);
   }
};

// to get the array of the users id and usernames of the particular restaurant
const customersIdAndUsernames = async () => {
   try {
     const response = await axios.get("https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/restaurants/1/");
     const customerIds = response.data.customers;
     const customerUsernames = response.data.customers_usernames;
     const mergedCustomers = customerIds.map((id: number, index: number) => ({
         id: id,
         username: customerUsernames[index],
     }));
     return mergedCustomers;
   } catch (error) {
     console.error(error);
    
   }
};

export {
    restVarId,
    customersIdAndUsernames
} 