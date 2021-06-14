/**
 * ************************************
 *
 * @module DebugRouter
 * @author Lorenzo Guevara
 * @date 6/10/2021
 * @description Debug Router for react-router-dom, this component is essentially a BrowserRouter component from react-router-dom which you can use to wrap your routes. It operates the same way, but console logs the current react-router-dom location and location history, so helpful for debugging.
 *
 * ************************************
 */

import { BrowserRouter as Router } from 'react-router-dom';

 class DebugRouter extends Router {
  constructor(props){
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null,2))
    this.history.listen((location, action)=>{
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null,2));
    });
  }
}

export default DebugRouter;