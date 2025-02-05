// Purpose: API calls for chat functionality.
const chatId = async (token: string | null,user1: string, user2: string) => {

    try {
        if(!token) return 
        const response = await fetch("https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/private-chatdb/", {
            body: JSON.stringify({
                user1,
                user2
            }),
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        const data = await response.json();
        return data.chat_id
    } catch (error) {
        console.log(error);
    }
}
const fetchChatId = async (token: string | null, username: string, activeChat: string) => {
    const chatIdData = await chatId(token,username, activeChat);
    return chatIdData;
  }

const chatHistory = async (token: string | null, chatId: string) => {
    try {
        if(!token) return 
        const response = await fetch(`https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/private-chat/?chat_id=${chatId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.status === 404){
            return []
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

const getGroupMessages = async (token: string | null) => {
    if(!token) return
    try {
        const response = await fetch('https://rk4huq4sfe.execute-api.eu-north-1.amazonaws.com/group-chat/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.status === 404){
            return []
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }

}

export {
    chatHistory,
    chatId,
    fetchChatId,
    getGroupMessages
}

