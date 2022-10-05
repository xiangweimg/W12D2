import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";

function App() {
  
  return (
    <div>
      <h1>Hello from App</h1>
    <Switch>
      <Route exact path ="/login">
      <LoginFormPage></LoginFormPage>
      </Route>
      <Route>
        anything else
      </Route>
    </Switch>
    </div>
  );
}

export default App;
