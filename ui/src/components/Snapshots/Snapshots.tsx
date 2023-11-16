import React, { useState, useEffect } from 'react';
import styles from '../Metrics/Metrics.module.scss';
import { ddClientRequest } from '../../models/ddClientRequest'
import Client from '../../models/Client'

const Snapshots = (): JSX.Element => {
  // Create states for left and right dropdowns
  const [dropDown, updateDropDown] = useState<JSX.Element[]>([]);
  const [dateLeft, updateDateLeft] = useState('');
  const [dateRight, updateDateRight] = useState('');

  const getDates = async (): Promise<void> => {
    const data = await Client.MetricService.fetchDates();
    populateDropdown(data)   
  }
  
  // Populating the dropdown box with dates
  const populateDropdown = (dates: []): void => {
    const newDropDown: JSX.Element[] = [];
    dates.forEach((dateObj: any) => {
      const date = dateObj.metric_date;
      const isoDate: any = new Date(date)
      const localDate = isoDate.toLocaleDateString();
      const localTime = isoDate.toLocaleTimeString();
      newDropDown.push(
        <option id="date-select" value={date}>
          {`${localDate} ${localTime}`}
        </option>
      );
    });
    updateDropDown(newDropDown);
  }

  // Retrieve snapshot metrics
  const retrieveSnapshot = (dropDownSide:string) => {
    const valueSelected: any = document.querySelector(`#select-${dropDownSide}`);
    const optionValue = valueSelected ? valueSelected.value : null;
    if (dropDownSide === 'left') {
      updateDateLeft(optionValue)
    }
    else if (dropDownSide === 'right') {
      updateDateRight(optionValue)
    }
  }

  useEffect(() => {
      getDates();
  },[])

  //Iframe for the left and right grafana visualizer
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
