import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CreateUser } from "./components/CreateUser";
import { UserDetail } from "./components/UserDetail";
import { UsersList } from "./components/UsersList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UsersList} />
          <Route exact path="/user/create" component={CreateUser} />
          <Route exact path="/user/:userid" component={UserDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
