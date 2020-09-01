import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions/actions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Images from './tabs/Images';
import RunningStopped from './tabs/RunningStopped';
import Metrics from './tabs/Metrics';
import Yml from './tabs/Yml';

const App = (props) => {
  const dispatch = useDispatch();
  const add = (data) => dispatch(actions.addContainer(data));
//  const getContainers = (data) => dispatch(actions.getContainers(data));
  //useselector Allows you to extract data from the Redux store state, using a selector function.
  const data = useSelector((state) => state.containers.containerList);

  useEffect(() => {
    console.log('hi')
    const runningContainers = [{
      id: '0',
      name: 'container0',
      CPU: '10',
      memory: '20',
      netio: '30',
      blockio: '40',
      pid: '2'    
    }, {
      id: '1',
      name: 'container1',
      CPU: '11',
      memory: '21',
      netio: '31',
      blockio: '41',
      pid: '3'    
    }, {
      id: '2',
      name: 'container2',
      CPU: '12',
      memory: '22',
      netio: '32',
      blockio: '42',
      pid: '4'    
    }];
    for(let i = 0; i < runningContainers.length; i++ ){
      add(runningContainers[i]);
    }
  }, []);

  useEffect(() => {
    console.log('hello')
    displayContainers(data);
  }, [data])

  const newArr = []
  const displayContainers = (data) => {
    for(let i = 0; i < data.length; i++){
      newArr.push(<p>{data[i].name}</p>)
    }
  }

  return (
    <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Running/Stop</Link>
                </li>
                <li>
                  <Link to="/images">Images</Link>
                </li>
                <li>
                  <Link to="/metrics">Metrics</Link>
                </li>
                <li>
                  <Link to="/yml">+</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/metrics">
                <Metrics />
              </Route>
              <Route path="/yml">
                <Yml />
              </Route>            
              <Route path="/images">
                <Images />
              </Route>
              <Route path="/">
                <RunningStopped runningContainers={newArr}/>
              </Route>
            </Switch>
          </div>
    </Router>
  );
};

export default App;
