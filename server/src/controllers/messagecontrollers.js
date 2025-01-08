const Conversation = require('../models/conversationmodel');
const Message = require('../models/messagemodel');
const { getReceiverSocketId, io } = require('../socket/socket');

const message = async(req, res)=>{
    try {
        const {message}= req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id

       let conversation = await  Conversation.findOne({
            participants:{
                $all: [senderId, receiverId]
            }
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(),newMessage.save()])

        //socket 
        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            //used to send events to specific clients
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage)

    } catch (error) {
        console.error("error in message controller",error.message);
        res.status(500).json({error:"internal server errro"})
    }
}

const getMessages = async (req, res) => {
    try {
        const{id:userToChatId}= req.params;
        const senderId = req.user._id;
        
        const conversation = await Conversation.findOne({
            participants:{
                $all: [senderId, userToChatId]
            }
        }).populate("messages");

        if(!conversation){
            return res.status(404).json([])
        }
        const message = conversation.messages;
        res.status(200).json(message)
    } catch (error) {
        console.error("error in message controller",error.message);
        res.status(500).json({error:"internal server errro"})
    }
}

module.exports = {message,getMessages}; 