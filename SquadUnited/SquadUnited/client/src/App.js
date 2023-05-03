import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from 'reactstrap';
import Header from './Components/Header';
import ApplicationViews from './Components/ApplicationViews';
import { onLoginStatusChange, me } from './Modules/authManager';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);

  
  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} userProfile={userProfile} />
      <ApplicationViews isLoggedIn={isLoggedIn}/>
    </Router>
  );
}

export default App;
