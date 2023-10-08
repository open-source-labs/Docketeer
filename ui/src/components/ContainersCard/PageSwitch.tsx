import React, { useState, useEffect } from 'react';
import styles from './ContainersCard.module.scss';
interface PageSwitchI {
  totalContainers: number,
  contPerPage: number,
  setPage: React.Dispatch<React.SetStateAction<number>>;
}


const PageSwitch = ({totalContainers, contPerPage, setPage}: PageSwitchI): JSX.Element  => {
  const pages: number[] = [];
  for (let i = 1; i <= Math.ceil(totalContainers / contPerPage); i++) {
    pages.push(i);
  }
  const [isActive, setActive] = useState(0)
    const handleClick = (pageNumber:number) => {
      setActive(pageNumber);
      setPage(pageNumber);
  };
  return (
    <div className = {styles.pageNumber}>
    {pages.map((pageNumber, i) => {
      return <button className={`${styles.buttonNumber} ${
            isActive === pageNumber ? styles.activeButton : ''
          }`} onClick={() => { handleClick(pageNumber)}} key = {i}>{pageNumber}</button>
    })}</div>
  )
}

export default PageSwitch;