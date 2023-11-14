import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';
import { ddClientRequest } from '../../models/ddClientRequest'
import Client from '../../models/Client'

const Snapshots = (): JSX.Element => {

  //added states for comparing snapshots
  // const [snapshotLeft, updateSnapshotLeft] = useState<JSX.Element[]>([]);
  // const [snapshotRight, updateSnapshotRight] = useState<JSX.Element[]>([]);
  const [dropDown, updateDropDown] = useState<JSX.Element[]>([]);
  const [dateLeft, updateDateLeft] = useState('');
  const [dateRight, updateDateRight] = useState('');

  const getDates = async (): Promise<void> => {
    console.log('I am in getDates')
    const data = await Client.ContainerService.fetchDates();
    console.log(data)
      populateDropdown(data)
      
  }
  
  const populateDropdown = (dates: []): void => {
    const newDropDown: JSX.Element[] = [];
    dates.forEach((dateObj: any) => {
      const date: string = dateObj.metric_date
    newDropDown.push(
        <option id="date-select" value={date}>
          {date}
        </option>
      )
      console.log('date added to dropDown list:', date)
      console.log('length of dropdown list:', dropDown.length)
    });
    updateDropDown(newDropDown);
  }

  const retrieveSnapshot = (dropDownSide:string) => {
    const valueSelected: any = document.querySelector(`#select-${dropDownSide}`);
    const optionValue = valueSelected ? valueSelected.value : null;
    if (dropDownSide === 'left') {
      updateDateLeft(optionValue)
    }
    else if (dropDownSide === 'right') {
      updateDateRight(optionValue)
    }
    console.log('valueSelected', optionValue);
  }

  useEffect(() => {
      getDates();
  },[])

  let iframeLinkLeft = `http://localhost:49155/d/a5ae5af6-d66f-48be-bc88-08dee3060f86/snapshot-test?orgId=1&var-metric_date=${dateLeft}&from=1699282966816&to=1699304566817&kiosk`;
  let iframeLinkRight = `http://localhost:49155/d/a5ae5af6-d66f-48be-bc88-08dee3060f86/snapshot-test?orgId=1&var-metric_date=${dateRight}&from=1699282966816&to=1699304566817&kiosk`

  return (
    <div className={styles.snapshotWrapper}>
      <div>
        <label>
          <strong>CHOOSE A DATE:</strong>
        </label>
        <select id="select-left">{dropDown}</select>

        <button
          className={styles.button}
          onClick={() => retrieveSnapshot("left")}
        >
          RETRIEVE SNAPSHOT
        </button>
        <div className={styles.snapshotContent}>
          <iframe
            className={styles.metrics}
            src={iframeLinkLeft}
          />
        </div>
      </div>
      <div>
        <label>
          <strong>CHOOSE A DATE:</strong>
        </label>
        <select id="select-right">{dropDown}</select>

        <button
          className={styles.button}
          onClick={() => retrieveSnapshot("right")}
        >
          RETRIEVE SNAPSHOT
        </button>
        <div className={styles.snapshotContent}>
          <iframe
            className={styles.metrics}
            src={iframeLinkRight}
          />
        </div>
      
      </div>
    </div>
  );
};

export default Snapshots;
