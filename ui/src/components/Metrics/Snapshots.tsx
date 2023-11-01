import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Snapshots = (): JSX.Element => {

  const [snapshotLeft, updateSnapshotLeft] = useState<JSX.Element[]>([]);
  const [snapshotRight, updateSnapshotRight] = useState<JSX.Element[]>([]);
  const [dropDown, updateDropDown] = useState<JSX.Element[]>([])

  const getDates = () : void => {
    fetch('http://localhost:3000/api/saveMetricsEntry/date')
      .then((data) => data.json())
      .then((data) => {
        populateDropdown(data)
      })
      .catch((err) => console.log(err));
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
    console.log('valueSelected', optionValue);

    getSnapshotDB(optionValue, dropDownSide);
  }

  const getSnapshotDB = (date, dropDownSide:string) => {
    fetch(`http://localhost:3000/api/saveMetricsEntry/snapshot/${date}`)
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        displaySnapshot(data, dropDownSide);
      })
      .catch((err) => console.log(err));
  }
  
  const displaySnapshot = (metrics, dropDownSide) => {
    const dataArray: JSX.Element[] = [];
    for (const key in metrics) {
      dataArray.push(
        <label>
          <p>
            {key}: {metrics[key]}
          </p>
        </label>
      );
    }
    if (dropDownSide === 'left') {
      updateSnapshotLeft(dataArray);
    }
    else if (dropDownSide === 'right'){
      updateSnapshotRight(dataArray);
    }
  }

  useEffect(() => {
      getDates();
  },[])

  return (
    <div className={styles.wrapper}>
      <label>Choose a date:</label>
      <select id="select-left">{dropDown}</select>
      <button
        className={styles.button}
        onClick={() => retrieveSnapshot('left')}
      >
        Retrieve Snapshot
      </button>
      {snapshotLeft}

      <label>Choose a date:</label>
      <select id="select-right">{dropDown}</select>
      <button
        className={styles.button}
        onClick={() => retrieveSnapshot('right')}
      >
        Retrieve Snapshot
      </button>
      {snapshotRight}
    </div>
  );
};

export default Snapshots;
