import React from 'react';

const WrapperComponent = (props) => {
  return (
    <div className="wrapper">
      {props.children}
    </div>
  );
};

export default WrapperComponent;
