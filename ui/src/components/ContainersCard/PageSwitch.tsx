import React, { useState, useEffect } from 'react';
import styles from './ContainersCard.module.scss';
interface PageSwitch {
  totalContainers: number,
  contPerPage: number,
  setPage: any;
}


const PageSwitch = ({totalContainers, contPerPage, setPage}): JSX.Element  => {
  let pages = []
  for (let i = 1; i <= Math.ceil(totalContainers / contPerPage); i++) {
    pages.push(i)
  }
  const [isActive, setActive] = useState(null)
    const handleClick = (pageNumber:number) => {
      setActive(pageNumber);
      setPage(pageNumber)
  };
  return (
    <div className = {styles.pageNumber}>
    {pages.map((pageNumber, i): any => {
      return <button className={`${styles.buttonNumber} ${
            isActive === pageNumber ? styles.activeButton : ''
          }`} onClick={() => { handleClick(pageNumber)}} key = {i}>{pageNumber}</button>
    })}</div>
  )
}

export default PageSwitch