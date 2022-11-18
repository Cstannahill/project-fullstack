import React, { useEffect, useState } from "react";
import applicationService from "../../services/applicationService";
import toastr from "toastr";
import AppCard from "./AppCard";
import "../../css/appview.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Row } from "react-bootstrap";

const ViewApplications = () => {
  const [apps, setApps] = useState({
    applications: [],
    appComponents: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (apps.applications.length < 1) {
      applicationService
        .getAllApplications()
        .then(onGetAppsSuccess)
        .catch(onGetApplicationsError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetAppsSuccess = (response) => {
    console.log(response);
    setApps((prevState) => {
      const newApps = { ...prevState };
      newApps.applications = response.data.items;
      newApps.appComponents = newApps.applications.map(mapApps);
      return newApps;
    });
  };
  const onCloseSuccess = (id) => {
    // setApps((prevState) => {
    //   const newApps = { ...prevState };
    //   newApps.applications = [...newApps.applications];
    //   const idx = newApps.applications.findIndex(
    //     (app) => Number(app.id) === Number(id)
    //   );
    //   newApps.applications[idx].dateClosed = new Date().toLocaleDateString();
    //   newApps.appComponents = newApps.applications.map(mapApps);
    //   return newApps;
    // });
    Swal.fire(
      "Deleted!",
      "Your application has been set to closed.",
      "success"
    );
    toastr.success("Application Successfully Closed!");
  };
  const onCloseError = () => {
    toastr.error("Application not closed, something went wrong.");
  };

  const onCloseRequest = (id) => {
    Swal.fire({
      title: "Close Application Status?",
      text: "Are you sure you want to close this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, close it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const closeHandler = onCloseSuccess(id);
        applicationService
          .closeApplication(id)
          .then(closeHandler)
          .catch(onCloseError);
      } else {
        Swal.fire("Application status still open.");
      }
    });
  };

  const onEditRequest = (app) => {
    const state = { type: "app_Data", payload: app };
    navigate("/appform", { state: state });
  };

  const mapApps = (app) => {
    return (
      <AppCard
        app={app}
        key={app.id}
        onEditRequest={onEditRequest}
        onCloseRequest={onCloseRequest}
      />
    );
  };

  const onGetApplicationsError = (err) => {
    console.log(err);
    toastr.error("Error retrieving applications.");
  };

  const handleViewOpen = () => {
    setApps((prevState) => {
      const newApps = { ...prevState };
      const filteredOpen = newApps.applications.filter((app) => !app.closed);
      newApps.appComponents = filteredOpen.map(mapApps);
      return newApps;
    });
  };

  const handleViewAll = () => {
    setApps((prevState) => {
      const newApps = { ...prevState };
      newApps.appComponents = newApps.applications.map(mapApps);
      return newApps;
    });
  };

  const handleViewInteraction = () => {
    setApps((prevState) => {
      const newApps = { ...prevState };
      const filteredOpen = newApps.applications.filter(
        (app) =>
          app.receivedCall === true ||
          app.receivedOffer === true ||
          app.offeredInterview === true
      );
      newApps.appComponents = filteredOpen.map(mapApps);
      return newApps;
    });
  };

  const handleViewClosed = () => {
    setApps((prevState) => {
      const newApps = { ...prevState };
      const filteredOpen = newApps.applications.filter(
        (app) => app.closed === true
      );
      newApps.appComponents = filteredOpen.map(mapApps);
      return newApps;
    });
  };

  return (
    <>
      <div>
        <h1 className="text-center">Applications</h1>
        <div className="d-flex">
          <div className="d-inline-flex my-1 app-view-sort my-2">
            <button
              className="btn btn-primary mx-1 app-view-sort"
              onClick={handleViewAll}
            >
              View All
            </button>
            <button
              className="btn btn-primary mx-1 app-view-sort"
              onClick={handleViewOpen}
            >
              View Open
            </button>
            <button
              className="btn btn-danger mx-1 app-view-sort"
              onClick={handleViewClosed}
            >
              View Closed
            </button>
            <button
              className="btn btn-warning mx-1  app-view-sort"
              onClick={handleViewInteraction}
            >
              View Interacted With
            </button>
          </div>
        </div>
      </div>
      <Row className="d-flex justify-content-around my-2 mx-3">
        {apps.appComponents && apps.appComponents}
      </Row>
    </>
  );
};
export default ViewApplications;
