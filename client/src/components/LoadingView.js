import React from 'react';
import { Spin } from 'antd';
const LoadingView = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingView;
