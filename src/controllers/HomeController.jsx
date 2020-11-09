import React, { useEffect, useState } from 'react';
// Common

const HomeController = (props) => {
  const {
    // Global state
    weather,
    // Redux actions
  } = props;

  // State
  const [temp, setTemp] = useState(0);

  // ----- useEffects ----- //
  useEffect(() => {
    console.log('MOUNT');
  }, []);

  const { View } = props;
  return (
    <View
      {...props}
      temp={temp}
    />
  );
};

export default HomeController;
