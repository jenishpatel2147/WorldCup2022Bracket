import React, { FC, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styles, { getDraggableStyle, getDroppableStyle } from "./styles";
import generateEliminationData from "../../utils/generateEliminationData";
import EliminationForm from "../Eliminations/elimination-form.component";
import "country-flag-icons/3x2/flags.css";
import { genereateRoundOf16 } from "../../store/playoffStageReducer";

import {
  updateGroupResults,
} from "../../store/groupStageReducer";

const GroupStageForm: FC = () => {

    const groups = useAppSelector(state => state.groupStage)
    const dispatch = useAppDispatch();

    const [isgroupStageDone, setGroupStageDone] = useState(false)

    const onDragEnd = (result: any) => {
        const { source, destination, draggableId } = result;
        console.log(result)
        if (!destination) return;
        const splittedSelect = draggableId.split("-", 3)
        reorderItems(source.index, destination.index, splittedSelect[1], splittedSelect[2]);
    };

    const reorderItems = (startIndex: number, endIndex: number, listIndex: number, teamName: string) => {
        const groupTeams = [...groups[listIndex].teams]
        const [removed] = groupTeams.splice(startIndex, 1);
        groupTeams.splice(endIndex, 0, removed);
        dispatch(updateGroupResults(listIndex, groupTeams))
    };

    const handleClick = () => {
      const data = generateEliminationData(groups)
      dispatch(genereateRoundOf16(data))
      setGroupStageDone(true)
    }

    return (
      <> 
      {!isgroupStageDone ? 
      <div style={styles.wrap}>
        <div>
          <strong>Group Stage Selector</strong>
        </div>

        {groups.map((group, index) => (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppabe-list">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getDroppableStyle(snapshot.isDraggingOver)}
                >
                  <strong>{group.name}</strong>
                  {group.teams.map((team, subindex) => (
                    <Draggable
                      draggableId={`draggable-${index}-${team.name}`}
                      key={team.name}
                      index={subindex}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getDraggableStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <h5><span className={"flag:" + team.flag} /> {team.name}</h5>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ))}
        <button onClick={handleClick}>Next</button>
      </div>: <EliminationForm />}
      </>
    );

}


export default GroupStageForm

