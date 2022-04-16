const styles = {
    wrap: {
      fontFamily: "sans-serif",
      TextAlign: "center",
      padding: "2rem"
    },
    droppable: {
      border: "1px dashed lightgray",
      margin: "1rem",
      padding: "0.5rem",
      borderRadius: "5px"
    },
    droppableDragging: {
      borderColor: "blue",
      height: "389.8px"
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
  
  export const getDroppableStyle = (isDraggingOver: boolean) => ({
    ...styles.droppable,
    ...(isDraggingOver && styles.droppableDragging)
  });
  
  export const getDraggableStyle = (isDragging: boolean, draggableStyles: any) => ({
    ...styles.draggable,
    ...(isDragging && styles.draggableDragging),
    ...draggableStyles
  });
  
  export default styles;
  