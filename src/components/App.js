import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions/actions";
const App = (props) => {
  const dispatch = useDispatch();
  const add = (data) => dispatch(actions.addContainer(data));
  //useselector Allows you to extract data from the Redux store state, using a selector function.
  const data = useSelector((state) => state.containers.containerList);

  useEffect(() => {
    add(1);
  }, []);

  // for(let i = 0; i < data.length; i++) {

  // }

  return (
    <div>
      Hello I am in react
      <p>{data}</p>
    </div>
  );
};

export default App;
