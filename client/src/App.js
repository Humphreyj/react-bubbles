import React, { useState } from "react";
import { BrowserRouter as Router, Route,Link,Redirect } from "react-router-dom";
import BubblePage from './components/BubblePage';
import BestLogin from "./components/BestLogin";
import "./styles.scss";

function App() {

  const PrivateRoute = ({component: BubblePage, ...rest}) => (
    <Route {...rest} render={(props) => 
    localStorage.getItem('token') ? (
      <BubblePage {...props} />
    ) : (
      <Redirect to='/login' />
    )
    } />
  )


  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={BestLogin} />
        <PrivateRoute path='/bubblesPage' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
