import React, { useReducer, useContext } from "react";
import PropTypes from "prop-types";
import { UserContext, KanbanContext } from "../../context/appContext";

import {
  members,
  labels,
  attachments,
  kanbanItems,
  comments,
  activities,
} from "./kanbanData";
import { kanbanReducer } from "../../reducers/kanbanReducer";

const KanbanProvider = ({ children }) => {
  const initData = {
    members: members,
    labels: labels,
    attachments: attachments,
    kanbanItems: kanbanItems,
    comments: comments,
    activities: activities,
    kanbanModal: {
      show: false,
      modalContent: {},
    },
  };
  const curUser = useContext(UserContext);
  const currentUser = {
    name: curUser.firstName,
    avatarSrc: curUser.avatarUrl,
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
