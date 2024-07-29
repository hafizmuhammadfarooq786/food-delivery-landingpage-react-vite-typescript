import React from 'react';
import { Oval } from 'react-loader-spinner';

interface LoadingProps {
  color?: string;
  secondaryColor?: string;
  height?: number;
  width?: number;
}

const Loader: React.FC<LoadingProps> = ({
  color,
  secondaryColor,
  height,
  width,
}) => {
  return (
    <Oval
      visible={true}
      height={height || 40}
      width={width || 40}
      color={color}
      secondaryColor={secondaryColor}
      ariaLabel="tail-spin-loading"
    />
  );
};

export default Loader;
