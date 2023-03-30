import React from 'react';
import styles from './ProcessLogsSelector.module.scss';

function ProcessLogsSelector({
  containerList,
  handleCheck,
  btnIdList,
  status,
}: ProcessLogsSelectorProps): JSX.Element {
  // const [containerList, setContainerList] =
  // useState<object[]>(defaultContainerList);

  return (
    <div className={styles.wrapper}>
      <form>
        <fieldset>
          <legend>{status} Containers</legend>
          {containerList.map((container, i) => {
            return (
              <div key={i}>
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
