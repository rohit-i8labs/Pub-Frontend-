import axios from "axios";

const getUserList = async () => {
  const response = await axios.get(
    "https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/users/",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  // console.log(response.data);
  return response.data;
};

export { getUserList };
