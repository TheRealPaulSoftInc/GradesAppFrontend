import React, { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { SemesterContext } from "../context/SemesterContext";
import { SemesterElement } from "./SemesterElement";

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

  let handleClickCreate = (semester, setIsCreating) => {
    return () => {
      let element = document.getElementById(`semesterCreate${semester.id}`);
      console.log(element);
      let value = element.getElementsByTagName("input")[0].value;
      let order = semester.order + 1;
      if (value) {
        const semestersArray = Array.from(semesters);
        const semestersAux = semestersArray.splice(order - 1);
        semestersAux.map((s, i) =>
          updateSemester({ id: s.id, order: order + i + 1 }, true)
        );
        postSemester({ name: value, order: order });
      }
      setIsCreating(false);
    };
  };

  let handleClickEdit = (semester, setIsEditing) => {
    return () => {
      let element = document.getElementById(`semesterLabel${semester.id}`);
      let value = element.getElementsByTagName("input")[0].value;
      if (value) {
        updateSemester({ id: semester.id, order: semester.order, name: value });
      }
      setIsEditing(false);
    };
  };

  let handleClickDelete = (id) => {
    if (semesters.length > 1) {
      setCurrentSemesterId(semesters[0].id);
      deleteSemester(id);
    }
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
                          <SemesterElement
                            value={s}
                            dragHandleProps={provided.dragHandleProps}
                            handleClickGet={handleClickGet}
                            handleClickCreate={handleClickCreate}
                            handleClickEdit={handleClickEdit}
                            handleClickDelete={handleClickDelete}
                            isSelected={s.id == currentSemesterId}
                          ></SemesterElement>
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
