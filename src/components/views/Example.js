import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Login from '../login/login';
import App from '../components/App';

const Example = () => {
  return (
    // <div>
    //   <h1>HELLO TEAM</h1>
    //   <ul>
    //     <li>This is list one</li>
    //     <li>This is list two</li>
    //     <li>This is list three</li>
    //     <li>This is list four</li>
    //   </ul>
    //   <p>
    //     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatem
    //     in eos aut repellat cum placeat facere, necessitatibus debitis officia
    //     pariatur ea ducimus tenetur culpa a suscipit atque at accusamus
    //     consequuntur laborum possimus minima fugit unde? Mollitia id, maxime
    //     velit, modi officia iure, provident est atque reiciendis vero dolores
    //     eius?
    //   </p>
    // </div>

    <section className='container2'>
      <h1>Matt is the Boss</h1>
      <Routes>
        <Route exact path='/' element={<App />} />
        {/* <Route exact path='/app' element={<App />} /> */}
      </Routes>
    </section>
  );
};

export default Example;
