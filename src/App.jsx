import { createBrowserHistory } from 'history'
import { Switch } from 'react-router-dom';
import { Router } from 'react-router-dom';
import Home from './pages/Home';
import ModalProducts from './pages/ModalProducts';


export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Home />
        {/* <ModalProducts /> */}

      </Switch>
    </Router>
  );
}

export default App;
