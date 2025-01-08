"use client";
import React, { useEffect, useRef } from "react";
import Message from "../message/page";
import UseGetMessages from "@/app/hooks/usegetmessages/page";
import MessageSkeleton from "@/app/skeletons/page";
import UseListenMessage from "@/app/hooks/uselistenmessage/page";

const Messages = () => {
  const { messages, loading } = UseGetMessages();
  UseListenMessage();
  console.log("messages", messages);

  const lastMessageRef = useRef();

  useEffect(() => {
	setTimeout(() => {
		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	}, 100);
}, [messages]);

  return (
    <div className="px-4 flex-1 scrollable">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
			<div key={message._id} ref={lastMessageRef}>
			<Message message={message} />
		</div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-black">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
