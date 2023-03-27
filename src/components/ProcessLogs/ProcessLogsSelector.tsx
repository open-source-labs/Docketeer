import React from 'react';

import styles from './ProcessLogsSelector.module.scss';

// const defaultContainerList = [
//   { 'container 1': false },
//   { 'container 2': false },
//   { 'container 3': false },
// ];

// TODO: add tooltip on hover for container name to show more info about container

function ProcessLogsSelector({ containerList, handleCheck, btnIdList }) {
  // const [containerList, setContainerList] =
  // useState<object[]>(defaultContainerList);

  return (
    <div className={styles.wrapper}>
      <form>
        <fieldset>
          <legend>Container List</legend>
          {containerList.map((container) => {
            return (
              <div key={container}>
                <input
                  type="checkbox"
                  id={container.Names}
                  value={container.Names}
                  checked={btnIdList[container.Names] === true}
                  onChange={(e) => {
                    handleCheck(e.target.id);
                  }}
                />
                <label htmlFor={container.Names}>{container.Names}</label>
              </div>
            );
          })}
        </fieldset>
      </form>
    </div>
  );
}

export default ProcessLogsSelector;
