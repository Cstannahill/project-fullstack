import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { ChatContext } from "../../context/appContext";
import users from "./people";
import rawThreads from "./threads";
import rawMessages from "./groups";
import groups from "./groups";
import { arrayReducer } from "../../reducers/arrayReducer";

const ChatProvider = ({ children }) => {
  const [messages, messagesDispatch] = useReducer(arrayReducer, rawMessages);
  const [threads, threadsDispatch] = useReducer(arrayReducer, rawThreads);
  const [currentThread, setCurrentThread] = useState(threads[0]);
  const [textAreaInitialHeight, setTextAreaInitialHeight] = useState(32);
  const [activeThreadId, setActiveThreadId] = useState(threads[0].id);
  const [isOpenThreadInfo, setIsOpenThreadInfo] = useState(false);
  const [scrollToBottom, setScrollToBottom] = useState(true);

  const getUser = (thread) => {
    let user = {};
    if (thread.type === "group") {
      const { name, members } = groups.find(({ id }) => id === thread.groupId);
      user = {
        name,
        avatarSrc: members.map(
          (member) => users.find(({ id }) => id === member.userId).avatarSrc
        ),
      };
    } else {
      user = users.find(({ id }) => id === thread.userId);
    }
    return user;
  };

  const value = {
    users,
    groups,
    threads,
    getUser,
    messages,
    activeThreadId,
    setActiveThreadId,
    threadsDispatch,
    messagesDispatch,
    textAreaInitialHeight,
    setTextAreaInitialHeight,
    isOpenThreadInfo,
    setIsOpenThreadInfo,
    currentThread,
    setCurrentThread,
    scrollToBottom,
    setScrollToBottom,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = { children: PropTypes.node.isRequired };

export default ChatProvider;
