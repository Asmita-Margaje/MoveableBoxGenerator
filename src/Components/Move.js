const Move = ({ top, left }) => {
    return (
      <div className="move-container">
        <div
          style={{ top: `${top}px`, left: `${left}px` }}
          className="move-div"
        ></div>
       </div>
    );
  };
  
  export default Move;
  