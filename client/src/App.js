import React from 'react';
import './sass/app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ControllerPage from "./pages/controller";
import ViewerPage from "./pages/viewer";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/controller/:album+" component={ControllerPage} />
          <Route path="/controller/:album?" component={ControllerPage} />
          <Route path="/">
            <ViewerPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
