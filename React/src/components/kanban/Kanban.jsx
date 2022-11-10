import React from "react";
import KanbanHeader from "./KanbanHeader";
import KanbanContainer from "./KanbanContainer";
import KanbanProvider from "./KanbanProvider";

const Kanban = () => {
  return (
    <>
      <KanbanProvider>
        <KanbanHeader />
        <KanbanContainer />
      </KanbanProvider>
    </>
  );
};

export default Kanban;
