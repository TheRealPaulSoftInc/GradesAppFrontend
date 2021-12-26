import React, { useContext, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { SemesterListElement } from "../components/SemesterListElement";
import { SemesterContext } from "../context/SemesterContext";

export const SemesterList = () => {
  let {
    semesters,
    setSemesters,
    currentSemesterId,
    setCurrentSemesterId,
    updateSemester,
  } = useContext(SemesterContext);

  let handleClickGet = (semester) => {
    setCurrentSemesterId(semester.id);
  };

  let handleClickCreate = (key) => {
    console.log(key, document.querySelector(`div[key='${key}']`));
  };

  let handleClickEdit = () => {
    console.log(3);
  };

  let handleClickDelete = () => {
    console.log(4);
  };

  let handleOnDragEnd = (result) => {
    const semestersArray = Array.from(semesters);
    const origin = semestersArray[result.source.index];
    const destination = semestersArray[result.destination.index];

    const [reorderedItem] = semestersArray.splice(result.source.index, 1);
    semestersArray.splice(result.destination.index, 0, reorderedItem);
    setSemesters(semestersArray);

    updateSemester({ id: origin.id, order: result.destination.index + 1 });
    updateSemester({ id: destination.id, order: result.source.index + 1 });
  };

  useEffect(() => {}, [semesters]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="relative 2xl:w-3/10 xl:w-1/4 lg:w-1/4">
        <div className="lg:absolute flex flex-col w-full pr-5 max-w-md">
          <h1 className="text-3xl font-semibold mb-4 hidden lg:block ">
            &nbsp;
          </h1>
          <Droppable droppableId="semester-list" ga={69}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                className="flex flex-col gap-2"
                {...provided.droppableProps}
              >
                {semesters ? (
                  semesters.map((s, index) => (
                    <Draggable
                      key={`semester${s.id}`}
                      draggableId={`semester${s.id}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <SemesterListElement
                            value={s}
                            dragHandleProps={provided.dragHandleProps}
                            handleClickGet={handleClickGet}
                            handleClickCreate={handleClickCreate}
                            handleClickEdit={handleClickEdit}
                            handleClickDelete={handleClickDelete}
                            isSelected={s.id == currentSemesterId}
                          ></SemesterListElement>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <></>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};
