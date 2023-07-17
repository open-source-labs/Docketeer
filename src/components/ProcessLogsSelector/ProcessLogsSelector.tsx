import React from 'react';
import styles from 'src/components/ProcessLogsSelector/ProcessLogsSelector.module.scss';
import globalStyles from 'src/components/global.module.scss';
import { ProcessLogsSelectorProps } from '../../../types';

function ProcessLogsSelector({
  containerList,
  handleCheck,
  btnIdList,
  status,
}: ProcessLogsSelectorProps): JSX.Element {
  // const [containerList, setContainerList] =
  // useState<object[]>(defaultContainerList);

  return (
    <form className={styles.wrapper}>
      <fieldset className={globalStyles.radioForm}>
        <legend>{status.toUpperCase()} CONTAINERS</legend>
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
  );
}

export default ProcessLogsSelector;
