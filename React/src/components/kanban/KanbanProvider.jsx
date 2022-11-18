import React, { useReducer, useContext, useState } from "react";
import PropTypes from "prop-types";
import { UserContext, KanbanContext } from "../../context/appContext";
import taskService from "../../services/taskService";
import {
  members,
  labels,
  attachments,
  comments,
  activities,
} from "./kanbanData";
import { kanbanReducer } from "../../reducers/kanbanReducer";
import { useEffect } from "react";

const KanbanProvider = ({ children }) => {
  const [currentBoardId, setCurrentBoardId] = useState();
  const curUser = useContext(UserContext);

  const onGetTaskBoardByUserSuccess = (res) => {
    kanbanDispatch({
      type: "INIT_USER_BOARDS",
      payload: res.items,
    });
  };
  const onGetTaskBoardByUserError = () => {};
  useEffect(() => {
    taskService
      .getTaskBoardByUserId(curUser.id)
      .then(onGetTaskBoardByUserSuccess)
      .catch(onGetTaskBoardByUserError);
  }, []);
  const initData = {
    members: members,
    labels: labels,
    attachments: attachments,
    userBoards: [],
    selectedBoard: { id: "", name: "" },
    kanbanItems: [],
    comments: comments,
    activities: activities,
    kanbanModal: {
      show: false,
      modalContent: {},
    },
  };

  const currentUser = {
    name: curUser?.firstName,
    avatarSrc: curUser?.avatarUrl,
    profileLink: "/user/profile",
    institutionLink: "#!",
  };
  const [kanbanState, kanbanDispatch] = useReducer(kanbanReducer, initData);

  return (
    <KanbanContext.Provider
      value={{ kanbanState, kanbanDispatch, currentUser }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

KanbanProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KanbanProvider;
