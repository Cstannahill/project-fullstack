import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import Background from "../common/Background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SoftBadge from "../common/SoftBadge";
import Avatar, { AvatarGroup } from "../common/Avatar";
import { Draggable } from "react-beautiful-dnd";
import { KanbanContext } from "../../context/appContext";
import taskService from "../../services/taskService";
import toastr from "toastr";

const TaskDropMenu = ({ id, handleEditTask }) => {
  const { kanbanDispatch } = useContext(KanbanContext);
  // useEffect(() => {
  //   document.body.style.backgroundColor = "silver";
  // }, []);

  const handleRemoveTaskCard = () => {
    taskService.closeTask(id).then(onCloseTaskSuccess).catch(onCloseTaskError);
  };
  const onCloseTaskSuccess = () => {
    kanbanDispatch({
      type: "REMOVE_TASK_CARD",
      payload: { id },
    });
  };
  const onCloseTaskError = () => {
    toastr.error("Something went wrong, task not removed!");
  };

  return (
    <Dropdown
      onClick={(e) => e.stopPropagation()}
      align="end"
      className="font-sans-serif"
    >
      <Dropdown.Toggle
        variant="falcon-default"
        size="sm"
        className="kanban-item-dropdown-btn hover-actions dropdown-caret-none m-0"
      >
        <FontAwesomeIcon
          icon="ellipsis-h"
          transform="shrink-2"
          size="sm"
          className="mx-0"
          color="white"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="py-0 z-index-2">
        <Dropdown.Item href="#!">Add Card</Dropdown.Item>
        <Dropdown.Item onClick={handleEditTask}>Edit</Dropdown.Item>
        <Dropdown.Item href="#!">Copy link</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleRemoveTaskCard} className="text-danger">
          Remove
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const TaskCard = ({
  task: {
    id,
    categoryId,
    title,
    members,
    attachments,
    labels,
    checklist,
    createdBy,
    dateCreated,
    dateModified,
    description,
  },
  index,
}) => {
  const { kanbanDispatch, currentUser } = useContext(KanbanContext);
  const image =
    attachments && attachments.find((item) => item.type === "image");

  const handleModalOpen = () => {
    kanbanDispatch({
      type: "OPEN_KANBAN_MODAL",
      payload: {
        id,
        title,
        members,
        attachments,
        labels,
        checklist,
        createdBy,
        dateCreated,
        dateModified,
        description,
        image,
        categoryId,
      },
    });
  };

  const handleEditTask = () => {
    kanbanDispatch({
      type: "OPEN_KANBAN_MODAL",
      payload: {
        id,
        title,
        members,
        attachments,
        labels,
        checklist,
        createdBy,
        dateCreated,
        dateModified,
        description,
        image,
        edit: true,
        categoryId,
      },
    });
  };

  // styles we need to apply on draggables
  const getItemStyle = (isDragging) => ({
    cursor: isDragging ? "grabbing" : "pointer",
    transform: isDragging ? "rotate(-2deg)" : "",
  });

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          className="kanban-item"
        >
          <Card
            style={getItemStyle(snapshot.isDragging)}
            className="kanban-item-card hover-actions-trigger"
            onClick={handleModalOpen}
            bg="dark"
            text="light"
          >
            {image && (
              <div
                className={`position-relative rounded-top-lg overflow-hidden ${image.className}`}
              >
                <Background image={image.url} />
              </div>
            )}
            <Card.Body>
              <div className="position-relative">
                <TaskDropMenu id={id} handleEditTask={handleEditTask} />
              </div>
              {labels && (
                <div className="mb-2">
                  {labels.map((label) => (
                    <SoftBadge
                      key={label.name}
                      bg={label.color.toLowerCase()}
                      className="py-1 me-1 mb-1"
                    >
                      {label.name}
                    </SoftBadge>
                  ))}
                </div>
              )}
              <p
                className="mb-0 fw-medium font-sans-serif stretched-link"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              {(members || attachments || checklist) && (
                <div className="kanban-item-footer cursor-default">
                  <div className="text-500 z-index-2">
                    {members &&
                      members.find(
                        (member) => member.name === currentUser.name
                      ) && (
                        <span className="me-2">
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip>You're assigned in this card</Tooltip>
                            }
                          >
                            <span>
                              <FontAwesomeIcon icon="eye" />
                            </span>
                          </OverlayTrigger>
                        </span>
                      )}

                    {attachments && (
                      <span className="me-2">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Attachments</Tooltip>}
                        >
                          <span>
                            <FontAwesomeIcon
                              icon="paperclip"
                              className="me-1"
                            />
                          </span>
                        </OverlayTrigger>
                        <span>{attachments.length}</span>
                      </span>
                    )}

                    {checklist && (
                      <span className="me-2">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Attachments</Tooltip>}
                        >
                          <span>
                            <FontAwesomeIcon icon="check" className="me-1" />
                          </span>
                        </OverlayTrigger>
                        <span>{`${checklist.completed}/${checklist.totalCount}`}</span>
                      </span>
                    )}
                  </div>
                  <div className="z-index-2">
                    {members && (
                      <AvatarGroup>
                        {members.map((member) => (
                          <OverlayTrigger
                            key={member.name}
                            placement="top"
                            overlay={<Tooltip>{member.name}</Tooltip>}
                          >
                            <div>
                              <Avatar
                                size="l"
                                src={member.url}
                                className="ms-n1"
                              />
                            </div>
                          </OverlayTrigger>
                        ))}
                      </AvatarGroup>
                    )}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

TaskDropMenu.propTypes = {
  id: PropTypes.number.isRequired,
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        text: PropTypes.string,
      })
    ),
    checklist: PropTypes.shape({
      totalCount: PropTypes.number,
      completed: PropTypes.number,
    }),
  }),
  index: PropTypes.number,
};

export default TaskCard;
