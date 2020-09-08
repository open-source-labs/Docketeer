import React, { useEffect } from "react";

//import ContainersReducer from '../reducers/ContainersReducer';

const YmlDisplay = (props) => {
  const display = () => {
    return <div>hey im here in display</div>;
  };

  return (
    <div>
      Hi
      {display}
    </div>
  );
};

export default YmlDisplay;
