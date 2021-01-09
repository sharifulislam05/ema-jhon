import './App.scss';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import OrderReview from './components/OrderReview/OrderReview';
import Inventory from './components/Inventory/Inventory';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header />
        <Switch>
          <Redirect exact from="/" to="/shop" /> 
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/product/:productkey">
            <ProductDetails />
          </Route>
          <Route path="/review">
            <OrderReview />
          </Route>
          <Route path="/inventory">
            <Inventory />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App;
