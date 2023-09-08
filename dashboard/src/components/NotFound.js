import React from 'react';
import '../static/css/WrapperComponent.css'

const WrapperComponent = (props) => {
  return (
    <div className="wrapper">
      {props.children}
    </div>
  );
};

export default WrapperComponent;
