import React, { useRef, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import IconButton from "../common/IconButton";
import { members } from "./kanbanData";
import GroupMember from "./GroupMember";
import InviteToBoard from "./InviteToBoard";
import Flex from "../common/Flex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KanbanContext } from "../../context/appContext";
import { useContext } from "react";
import { useEffect } from "react";
import taskService from "../../services/taskService";

const KanbanHeader = () => {
  const [boardOptions, setBoardOptions] = useState();
  const { kanbanState, kanbanDispatch } = useContext(KanbanContext);
  useEffect(() => {
    if (kanbanState.selectedBoard.id >= 1) {
      taskService
        .getTaskBoardById(kanbanState.selectedBoard.id)
        .then(onGetTaskSuccess)
        .catch(onGetTaskError);
    }
  }, [kanbanState.selectedBoard.id]);
  const onGetTaskSuccess = (res) => {
    console.log(res);
    res.categories.forEach((item) => {
      const list = {};
      list.items = item.tasks || [];
      list.id = item.id;
      list.name = item.name;
      kanbanDispatch({
        type: "ADD_KANBAN_COLUMN",
        payload: list,
      });
    });
    kanbanDispatch({
      type: "INIT_BOARD_MEMBERS",
      payload: res.members,
    });
    kanbanDispatch({
      type: "ADD_BOARD_LABELS",
      payload: res.taskLabelOptions,
    });
  };
  const onGetTaskError = (err) => {
    console.log(err);
  };
  const handleClick = (e) => {
    const name = e.currentTarget.name;
    const id = e.currentTarget.id;
    const payload = { id, name };
    kanbanDispatch({ type: "SELECT_NEW_BOARD", payload });
  };

  return (
    <Row className="gx-0 kanban-header rounded-2 px-card py-2 mt-2 mb-3">
      <Col className="d-flex align-items-center">
        <h5 className="mb-0">Tasks</h5>
        <IconButton
          variant="falcon-default"
          size="sm"
          className="ms-3"
          icon={["far", "star"]}
        />
        <div className="vertical-line vertical-line-400 position-relative h-100 mx-3"></div>

        <GroupMember
          avatarSize="l"
          users={kanbanState?.members}
          showMember={4}
          className="d-none d-md-block"
        />
        <div className="vertical-line vertical-line-400 position-relative h-100 mx-3 d-none d-md-flex"></div>
        <InviteToBoard />
        <Dropdown align="end" className="font-sans-serif mx-3">
          <Dropdown.Toggle size="sm" variant="falcon-default">
            {kanbanState.selectedBoard?.id
              ? kanbanState.selectedBoard.name
              : "Choose a board"}
          </Dropdown.Toggle>
          <Dropdown.Menu className="border py-2">
            {/* <Dropdown.Item value={1}>Demo Board</Dropdown.Item> */}
            {kanbanState?.userBoards?.map((board) => (
              <Dropdown.Item
                onClick={handleClick}
                key={board?.id}
                name={board?.name}
                id={board?.id}
              >
                {board?.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col xs="auto" as={Flex} alignItems="center">
        <IconButton
          variant="falcon-default"
          size="sm"
          icon="plus"
          iconClassName="me-2"
          className="me-2 d-none d-md-block"
        >
          Add Column
        </IconButton>
        <Dropdown align="end" className="font-sans-serif">
          <Dropdown.Toggle
            size="sm"
            variant="falcon-default"
            className="dropdown-caret-none"
          >
            <FontAwesomeIcon icon="ellipsis-h" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="border py-2">
            <Dropdown.Item href="#!">Copy link</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#!">Settings</Dropdown.Item>
            <Dropdown.Item href="#!">Themes</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#!" className="text-danger">
              Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default KanbanHeader;
