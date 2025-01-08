import useConversation from "@/app/zustand/page";
import { useState } from "react";
import toast from "react-hot-toast";


const UseSendMessage = () => {

    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation}=useConversation();

    const sendMessage= async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:9000/send/${selectedConversation._id}`,{
                method:'POST',
                credentials: 'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({message})
            })
            const data = await res.json();
            if(data.error)
                throw new Error(data.error);

            setMessages([...messages,data])
            
            
        } catch (error) {
            toast.error(error.message);
            
        }finally{
            setLoading(false);
        }
    }
    return {sendMessage,loading};
}

export default UseSendMessage;
