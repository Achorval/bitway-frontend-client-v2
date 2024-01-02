import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = (props) =>(
  <SkeletonTheme {...props.attrSpinner}>
    <p>
      <Skeleton {...props.attrCount} />
    </p>
  </SkeletonTheme>
);

export default SkeletonLoader;