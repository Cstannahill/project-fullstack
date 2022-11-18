import React from "react";
import Flex from "../common/Flex";
import SoftBadge from "../common/SoftBadge";
import { Dropdown, Button, ListGroup, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import taskService from "../../services/taskService";
import toastr from "toastr";
import Swal from "sweetalert2";
import { useContext } from "react";
import { KanbanContext } from "../../context/appContext";

const ModalLabelContent = ({ labels, task, allLabels }) => {
  const [labelAr, setLabelAr] = useState({
    labels: [],
    mappedLabels: [],
  });
  const { kanbanDispatch } = useContext(KanbanContext);
  const [create, setCreate] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (labelAr?.labels?.length < 1) {
      setLabelAr((prev) => {
        let newAr = { ...prev };
        newAr.labels = labels;
        newAr.mappedLabels = newAr?.labels?.map(mapThisTaskLabels);
        return newAr;
      });
    } else {
      setLabelAr((prev) => {
        let lbls = { ...prev };
        lbls.mappedLabels = labelAr?.labels?.map(mapThisTaskLabels);
        return lbls;
      });
    }
  }, [labelAr.labels]);
  const labelRef = useRef();
  const onCreateClicked = () => {
    setCreate(true);
  };
  const handleSelect = (e) => {
    const target = e.currentTarget.id;
    setSelected((prevState) => {
      let selection = { ...prevState };
      selection = target;
      if (prevState === target) {
        selection = "";
      }
      return selection;
    });
  };
  const onCreateLabelSuccess = (res) => {
    const payload = {
      taskBoardId: res.taskBoardId,
      color: res.color,
      name: res.name,
    };
    console.log(res);
    kanbanDispatch({
      type: "ADD_BOARD_LABELS",
      payload: payload,
    });
    Swal.fire({
      title: "Add Label To Current Task?",
      showCancelButton: true,
      confirmButtonColor: "#0077b5",
      cancelButtonColor: "#ff0001",
      confirmButtonText: "Yes, add it.",
    }).then((result) => {
      if (result.isConfirmed) {
        taskService
          .addLabel({ taskId: task.id, taskLabelTypeId: res.data.item })
          .then(onAddSuccess)
          .catch(onAddError);
        Swal.fire("Added", "success");
      }
    });
  };
  const onAddSuccess = () => {};
  const onAddError = () => {
    toastr.error("Error!");
  };
  const onCreateLabelError = () => {
    toastr.error("Error!");
  };
  const handleSubmit = () => {
    console.log(labels, labelAr);
    const name = labelRef?.current?.value;
    const payload = { name: name, color: selected, taskBoardId: 1 };
    taskService
      .createLabel(payload)
      .then(onCreateLabelSuccess)
      .catch(onCreateLabelError);
  };
  const mapThisTaskLabels = (label) => {
    return (
      <SoftBadge
        bg={label?.color?.toLowerCase()}
        className="me-1 py-2"
        key={label?.name}
      >
        {label?.name}
      </SoftBadge>
    );
  };
  const handleLabel = (e) => {
    const payload = { taskId: task.id, taskLabelTypeId: "" };
    payload.taskLabelTypeId = Number(e.currentTarget.id);
    Swal.fire({
      title: "Add Label To Current Task?",
      showCancelButton: true,
      confirmButtonColor: "#0077b5",
      cancelButtonColor: "#ff0001",
      confirmButtonText: "Yes, Add It.",
    }).then((result) => {
      if (result.isConfirmed) {
        kanbanDispatch({
          type: "UPDATE_TASK_CARD",
          payload: { ...payload, category: task.categoryId },
        });
        taskService.addLabel(payload).then(onAddSuccess).catch(onAddError);
        Swal.fire("Added!", "Success!");
      }
    });
  };
  return (
    <Flex>
      {labelAr.mappedLabels}
      <Dropdown>
        <Dropdown.Toggle
          variant="secondary"
          size="sm"
          className="px-2 fsp-75 bg-400 border-400 dropdown-caret-none"
        >
          <FontAwesomeIcon icon="plus" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <h6 className="dropdown-header py-0 px-3 mb-0">Select Label</h6>
          <Dropdown.Divider />
          <div className="px-3">
            {allLabels?.map((label) => (
              <Dropdown.Item
                id={label.id}
                name={label.name}
                onClick={handleLabel}
                as="button"
                className={
                  label.color === "twitter" ||
                  label.color === "youtube" ||
                  label.color === "facebook" ||
                  label.color === "github" ||
                  label.color === "linkedin" ||
                  label.color === "google-plus"
                    ? `badge-soft bg-${label?.color?.toLowerCase()} rounded-1 mb-2`
                    : `badge-soft-${label?.color?.toLowerCase()} rounded-1 mb-2`
                }
                key={label?.name}
              >
                {label?.name}
              </Dropdown.Item>
            ))}
          </div>
          <Dropdown.Divider />
          <div className="px-3">
            {!create ? (
              <Button
                variant="outline-secondary"
                size="sm"
                className="d-block w-100 border-400"
                onClick={onCreateClicked}
              >
                Create label
              </Button>
            ) : (
              <>
                <input className="form-control" ref={labelRef} />
                <Row className="mt-1">
                  <Col xxl={6} xl={6} lg={6} md={6} s={6}>
                    <ListGroup>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="youtube"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          id="youtube"
                          className={
                            selected === "youtube"
                              ? "mx-auto my-auto p-3 bg-youtube d-flex active-label-color"
                              : "mx-auto my-auto p-3 bg-youtube d-flex"
                          }
                          onClick={handleSelect}
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="twitter"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          onClick={handleSelect}
                          id="twitter"
                          className={
                            selected === "twitter"
                              ? "mx-auto my-auto p-3 bg-twitter d-flex active-label-color"
                              : "mx-auto my-auto p-3 bg-twitter d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="linkedin"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          onClick={handleSelect}
                          id="linkedin"
                          className={
                            selected === "linkedin"
                              ? "mx-auto my-auto p-3 bg-linkedin d-flex active-label-color"
                              : "mx-auto my-auto p-3 bg-linkedin d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="facebook"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          onClick={handleSelect}
                          id="facebook"
                          className={
                            selected === "facebook"
                              ? "mx-auto my-auto p-3 bg-facebook d-flex active-label-color"
                              : "mx-auto my-auto p-3 bg-facebook d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="google-plus"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          onClick={handleSelect}
                          id="google-plus"
                          className={
                            selected === "google-plus"
                              ? "mx-auto my-auto p-3 bg-google-plus d-flex active-label-color"
                              : "mx-auto my-auto p-3 bg-google-plus d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        id="github"
                        onClick={handleSelect}
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          onClick={handleSelect}
                          id="github"
                          className={
                            selected === "github"
                              ? "mx-auto my-auto p-3 d-flex active-label-color"
                              : "mx-auto my-auto p-3 d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col xxl={6} xl={6} lg={6} md={6} s={6}>
                    <ListGroup>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="primary"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          id="primary"
                          bg="primary"
                          className={
                            selected === "primary"
                              ? "mx-auto my-auto p-3 d-flex active-label-color"
                              : "mx-auto my-auto p-3 d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="secondary"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          id="secondary"
                          bg="secondary"
                          className={
                            selected === "secondary"
                              ? "mx-auto my-auto p-3 d-flex active-label-color"
                              : "mx-auto my-auto p-3 d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="success"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          id="success"
                          bg="success"
                          className={
                            selected === "success"
                              ? "mx-auto my-auto p-3 d-flex active-label-color"
                              : "mx-auto my-auto p-3 d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="info"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          id="info"
                          bg="info"
                          className={
                            selected === "info"
                              ? "mx-auto my-auto p-3 d-flex active-label-color"
                              : "mx-auto my-auto p-3 d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="warning"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          id="warning"
                          bg="warning"
                          className={
                            selected === "warning"
                              ? "mx-auto my-auto p-3 d-flex active-label-color"
                              : "mx-auto my-auto p-3 d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                      <ListGroup.Item
                        onClick={handleSelect}
                        id="danger"
                        className="my-1 p-0"
                      >
                        <SoftBadge
                          id="danger"
                          bg="danger"
                          className={
                            selected === "danger"
                              ? "mx-auto my-auto p-3 d-flex active-label-color"
                              : "mx-auto my-auto p-3 d-flex"
                          }
                        >
                          {" "}
                        </SoftBadge>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Button
                    // variant="facebook"
                    type="submit"
                    className="btn bg-facebook w-75 mx-auto mt-2"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Row>
              </>
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </Flex>
  );
};

export default ModalLabelContent;
