import React from 'react';
// import Navbar from '../components/common/Navbar';

// TEMP
const Navbar = () => <></>;

const WithLayoutHOC = (ComposedComponent) => {
  const WithLayout = (props) => (
    <>
      <Navbar />
      <ComposedComponent {...props} />
    </>
  );

  return WithLayout;
};

export default WithLayoutHOC;
