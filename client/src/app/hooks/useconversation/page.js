'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Useconversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                // Update the endpoint if needed
                const res = await axios.get("http://localhost:9000/getUsers", {
                    withCredentials: true,
                });

                const data = res.data;
                if (data.error) {
                    throw new Error(data.error);
                }

                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default Useconversation;
