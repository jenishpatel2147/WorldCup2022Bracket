const styles = {
    wrap: {
      fontFamily: "sans-serif",
      textAlign: "center",
      padding: "1rem"
    },
    droppable: {
      border: "1px dashed lightgray",
      margin: "1rem",
      padding: "1rem",
      borderRadius: "5px"
    },
    droppableDragging: {
      borderColor: "green"
    },
    draggable: {
      border: "1px solid lightgray",
      backgroundColor: "white",
      margin: ".5rem",
      padding: ".5rem",
      borderRadius: "5px"
    },
    draggableDragging: {
      backgroundColor: "lightgreen",
      color: "white"
    }
  };
  
  export const getDroppableStyle = isDraggingOver => ({
    ...styles.droppable,
    ...(isDraggingOver && styles.droppableDragging)
  });
  
  export const getDraggableStyle = (isDragging, draggableStyles) => ({
    ...styles.draggable,
    ...(isDragging && styles.draggableDragging),
    ...draggableStyles
  });
  
  export default styles;
  