import React from 'react';
// import Navbar from '../components/common/Navbar';

// TEMP
const NavBar = () => <></>;

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
