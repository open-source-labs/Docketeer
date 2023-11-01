import React, { useState, useEffect } from 'react';
import styles from './Metrics.module.scss';

const Snapshots = (): JSX.Element => {
 
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
        <option>
          {date}
        </option>
      )
      console.log('date added to dropDown list:', date)
      console.log('length of dropdown list:', dropDown.length)
    });
    updateDropDown(newDropDown);
  }

  useEffect(() => {
      getDates();
  },[])

  return (
    <div>
      <label>
        Choose a date:
      </label>
        <select>
          {dropDown}
        </select>
    </div>
  );
};

export default Snapshots;
