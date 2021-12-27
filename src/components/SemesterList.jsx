import React, { useContext, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactDOM from "react-dom";
import { SemesterListElement } from "../components/SemesterListElement";
import { SemesterContext } from "../context/SemesterContext";
import OutsideClickHandler from "../utils/OutsideClickHandler";

export const SemesterList = () => {
  let {
    semesters,
    setSemesters,
    currentSemesterId,
    setCurrentSemesterId,
    updateSemester,
    postSemester,
    deleteSemester,
  } = useContext(SemesterContext);

  let handleClickGet = (semester) => {
    setCurrentSemesterId(semester.id);
  };

  let handleClickCreate = (id, order) => {
    let element = document.getElementById(`semesterCreate${id}`);
    let handleEvent = () => {
      let value = element.getElementsByTagName("input")[0].value;
      if (value) {
        const semestersArray = Array.from(semesters);
        const semestersAux = semestersArray.splice(order - 1);
        semestersAux.map((s, i) =>
          updateSemester({ id: s.id, order: order + i + 1 }, true)
        );
        postSemester({ name: value, order: order });
      }
      ReactDOM.render(<div id={`semesterCreate${id}`}></div>, element);
    };
    let template = (
      <OutsideClickHandler handleEvent={handleEvent} className="w-full">
        <input
          type="text"
          className="mt-3 w-full text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 py-1.5 px-3 shadow rounded-lg duration-150"
        />
      </OutsideClickHandler>
    );
    ReactDOM.render(template, element);
  };

  let handleClickEdit = (semester) => {
    let element = document.getElementById(`semesterLabel${semester.id}`);
    let handleEvent = () => {
      let value = element.value;
      console.log(element);
      if (value) {
        updateSemester({ id: semester.id, order: semester.order, name: value });
      }
      ReactDOM.render(<div id={`semesterCreate${semester.id}`}></div>, element);
    };
    let template = (
      <OutsideClickHandler handleEvent={handleEvent} className="w-full">
        <input
          type="text"
          className="w-full text-sm border border-gray-300 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 py-1.5 px-3 shadow rounded-lg duration-150"
        />
      </OutsideClickHandler>
    );
    ReactDOM.render(template, element);
  };

  let handleClickDelete = (id) => {
    if (semesters.length > 0) deleteSemester(id);
  };

  let handleOnDragEnd = (result) => {
    const semestersArray = Array.from(semesters);
    const [reorderedItem] = semestersArray.splice(result.source.index, 1);
    semestersArray.splice(result.destination.index, 0, reorderedItem);
    setSemesters(semestersArray);
    semestersArray.forEach((s, i) => {
      updateSemester({ id: s.id, order: i + 1 });
    });
  };

  useEffect(() => {}, [semesters]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="relative 2xl:w-3/10 xl:w-1/4 lg:w-1/4">
        <div className="lg:absolute flex flex-col w-full pr-5 max-w-md">
          <h1 className="text-3xl font-semibold mb-4 hidden lg:block ">
            &nbsp;
          </h1>
          <Droppable droppableId="semester-list">
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
                          <div id={`semesterCreate${s.id}`}></div>
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
