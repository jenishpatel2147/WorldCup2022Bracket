import React from "react";
import { render } from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles, { getDraggableStyle, getDroppableStyle } from "./styles";

class App extends React.Component {
  state = {
    items: [
      { group: "Group A", teams: ["A", "B", "C", "D"] },
      { group: "Group B", teams: ["A", "B", "C", "D"] },
      { group: "Group C", teams: ["A", "B", "C", "D"] },
      { group: "Group D", teams: ["A", "B", "C", "D"] },
      { group: "Group E", teams: ["A", "B", "C", "D"] },
      { group: "Group F", teams: ["A", "B", "C", "D"] },
      { group: "Group G", teams: ["A", "B", "C", "D"] },
      { group: "Group H", teams: ["A", "B", "C", "D"] }
    ]
  };

  reorderItems = (startIndex, endIndex) => {
    const items = Array.from(this.state.items);
    const [removed] = items.splice(startIndex, 1);
    items.splice(endIndex, 0, removed);
    this.setState({ items });
  };

  onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    this.reorderItems(source.index, destination.index);
  };

  render() {
    const { items, value } = this.state;

    console.log(value);

    return (
      <div style={styles.wrap}>
        <div>
          <strong>This field works: </strong>
          <input type="text" />
        </div>

        {items.map((number, key) => (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppabe-list">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getDroppableStyle(snapshot.isDraggingOver)}
                >
                  <strong>...and also these: </strong>
                  {number.teams.map((number, key) => (
                    <Draggable
                      draggableId={`draggable-${number.group}`}
                      key={key}
                      index={key}
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
                          <h5>{number}</h5>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ))}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
