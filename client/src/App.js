import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route,Link,Redirect } from "react-router-dom";
import BubblePage from './components/BubblePage';
import BestLogin from "./components/BestLogin";
import "./styles.scss";
import { axiosWithAuth } from './tools/axiosAuth';

function App() {

  const [colorData, setColorData] = useState([])

  useEffect(() => {
    axiosWithAuth()
    .get('http://localhost:5000/api/colors')
    .then(res => {
      console.log(res);
      setColorData(res.data);
      
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  const PrivateRoute = ({component: BubblePage, ...rest}) => (
    <Route {...rest} render={(props) => 
    localStorage.getItem('token') ? (
      <BubblePage {...props}
      colorData={colorData}
      setColorData={setColorData} />
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
