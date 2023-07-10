import React from "react";
import { useAppSelector } from '../../reducers/hooks';

const Network = (): JSX.Element => {
  const { networkContainerList } = useAppSelector((state) => state.networks);
  return (
    <div></div>
  );
};

export default Network