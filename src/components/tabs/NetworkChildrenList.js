import React, { useState } from 'react';
const NetworkChildrenList = (props) => {
    
    let ChildrenList = () => {
        let newArray = [];
        console.log('props.networkList', props.networkList);
        for (let j = 0; j < props.networkList[props.parent].length; j++) {
            let parents = props.networkList[props.parent][j];

              for (let k = 0; k < parents.length; k++) {
                let container = props.networkList[props.parent][j][k];
                // console.log('container', container);
                newArray.push(
                  <div className="yml-info" key={`yml-info${k}`}>
                    <div className="yml-info-box" key={`yml-info-box${k}`}>
                      <p>ID: {container["cid"]}</p>
                      <p>Name: {container["name"]}</p>
                    </div>
                  </div>
                );
              }
            

          }
          return <>{newArray}</>;
    }



    return (
        <div>
            <ChildrenList />
        </div>
    )
}

export default NetworkChildrenList;