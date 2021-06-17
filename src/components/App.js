import React from "react";
import MainSection from "./MainSection/MainSection";
import AboutPage from "./AboutPage";
import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

function App() {

  return (
    <div className="container-fluid">
      <CssBaseline />
      {/* <Header /> */}
      <Switch>
        <Route path="/browser" exact component={MainSection} />
        <Redirect exact from="/" to="browser"  />
        <Route path="/about" component={AboutPage} />
        {/* <Route path="/courses" component={CoursesPage} />
        
        <Route path="/course/:slug" component={ManageCoursePage} />
        
        <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
