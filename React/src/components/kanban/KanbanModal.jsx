import React, { useContext } from "react";
import {
  CloseButton,
  Col,
  Modal,
  Row,
  Dropdown,
  Button,
} from "react-bootstrap";
import Background from "../common/Background";
import { Link } from "react-router-dom";
import ModalMediaContent from "./ModalMediaContent";
import GroupMember from "./GroupMember";
import { members } from "./kanbanData";
import ModalLabelContent from "./ModalLabelContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalAttachmentContent from "./ModalAttachmentContent";
import ModalCommentContent from "./ModalCommentContent";
import ModalActivityContent from "./ModalActivityContent";
import { KanbanContext } from "../../context/appContext";
import ModalSidebar from "./ModalSidebar";
import { useRef } from "react";
import { useState } from "react";
import taskService from "../../services/taskService";
import { useEffect } from "react";
import toastr from "toastr";

const KanbanModal = () => {
  const [edit, setEdit] = useState(false);
  const {
    kanbanState: { kanbanModal },
    kanbanState: { labels },
    kanbanState: { members },
    kanbanDispatch,
  } = useContext(KanbanContext);
  console.log(labels);
  const descRef = useRef();
  const { payload } = kanbanModal.modalContent;
  const handleClose = () => {
    kanbanDispatch({ type: "TOGGLE_KANBAN_MODAL" });
  };
  const onEditClicked = () => {
    setEdit(!edit);
  };
  var sendData = {};
  const onEditAccepted = () => {
    sendData = { ...payload };
    sendData.description = descRef?.current?.value;
    taskService.updateTask(sendData).then(onEditSuccess).catch(onEditError);
    payload.description = sendData.description;
  };
  const onEditSuccess = () => {
    toastr.success("Updated.");
    setEdit(!edit);
  };
  const onEditError = () => {
    toastr.error("Updates not saved.");
  };
  return (
    <Modal
      show={kanbanModal.show}
      size="lg"
      onHide={handleClose}
      contentClassName="border-0"
      dialogClassName="mt-6"
    >
      {payload?.image && (
        <div className="position-relative overflow-hidden py-8">
          <Background image={payload?.image?.url} className="rounded-top-lg" />
        </div>
      )}
      <div className="position-absolute top-0 end-0 mt-3 me-3 z-index-1">
        <CloseButton
          onClick={handleClose}
          className="btn btn-sm btn-circle d-flex flex-center transition-base"
        />
      </div>
      <Modal.Body className="p-0">
        <div className="bg-light rounded-top-lg px-4 py-3">
          <h4 className="mb-1">{payload?.title && payload?.title}</h4>
          <p className="fs--2 mb-0">
            Added by{" "}
            <Link to="#!" className="text-600 fw-semi-bold">
              Antony
            </Link>
          </p>
        </div>
        <div className="p-4">
          <Row>
            <Col lg={9}>
              <ModalMediaContent title="Currently Assigned" icon="user">
                <GroupMember
                  users={members}
                  addMember
                  showMember={6}
                  avatarSize="2xl"
                />
              </ModalMediaContent>

              <ModalMediaContent title="Labels" icon="tag">
                <ModalLabelContent
                  labels={payload?.labels && payload.labels}
                  allLabels={labels}
                  task={payload}
                />
              </ModalMediaContent>

              <ModalMediaContent
                title="Description"
                icon="align-left"
                isDesc={onEditClicked}
                submitDesc={onEditAccepted}
                edit={edit}
              >
                {kanbanModal?.modalContent?.payload?.edit || edit ? (
                  <form>
                    <textarea
                      type="text-area"
                      rows={3}
                      name="description"
                      className="w-100"
                      ref={descRef}
                    />
                  </form>
                ) : (
                  <p className="text-word-break fs--1">
                    {payload?.description}
                  </p>
                )}
              </ModalMediaContent>
              <ModalMediaContent
                title="Attachments"
                icon="paperclip"
                headingClass="d-flex justify-content-between"
                headingContent={
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="falcon-default"
                      size="sm"
                      className="dropdown-caret-none fs--2"
                    >
                      <FontAwesomeIcon icon="plus" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Computer</Dropdown.Item>
                      <Dropdown.Item>Google Drive</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>Attach Link</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              >
                <ModalAttachmentContent />
              </ModalMediaContent>

              <ModalMediaContent
                title="Comments"
                icon={["far", "comment"]}
                headingClass="mb-3"
              >
                <ModalCommentContent />
              </ModalMediaContent>

              <ModalMediaContent
                title="Activity"
                icon="list-ul"
                headingClass="mb-3"
                isHr={false}
              >
                <ModalActivityContent />
              </ModalMediaContent>
            </Col>
            <Col lg={3}>
              <ModalSidebar />
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default KanbanModal;
