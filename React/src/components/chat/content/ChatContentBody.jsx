import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ChatContentBodyIntro from "./ChatContentBodyIntro";
import Message from "./Message";
import SimpleBarReact from "simplebar-react";
import ThreadInfo from "./ThreadInfo";
import { ChatContext } from "../../../context/appContext";

const ChatContentBody = ({ thread }) => {
  let lastDate = null;
  const messagesEndRef = useRef();

  const { getUser, messages, scrollToBottom, setScrollToBottom } =
    useContext(ChatContext);
  const user = getUser(thread);
  var content = messages?.find(({ id }) => id === thread?.messagesId);
  if (content) {
    ({ content } = content);
  }

  useEffect(() => {
    if (scrollToBottom) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
      setScrollToBottom(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToBottom]);

  return (
    <div className="chat-content-body" style={{ display: "inherit" }}>
      <ThreadInfo thread={thread} isOpenThreadInfo={true} />
      <SimpleBarReact style={{ height: "100%" }}>
        <div className="chat-content-scroll-area">
          <ChatContentBodyIntro user={user} />
          {content?.map(({ message, time, senderUserId, status }, index) => (
            <div key={index}>
              {lastDate !== time.date && (
                <div className="text-center fs--2 text-500">{`${time.date}, ${time.hour}`}</div>
              )}
              {(() => {
                lastDate = time.date;
              })()}
              <Message
                message={message}
                senderUserId={senderUserId}
                time={time}
                status={status}
                isGroup={thread.type === "group"}
              />
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </SimpleBarReact>
    </div>
  );
};

ChatContentBody.propTypes = {
  thread: PropTypes.object.isRequired,
};

export default ChatContentBody;
