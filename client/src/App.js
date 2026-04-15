import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Marketplace, NotFound } from './Components/index';
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import ShoppingBag from './Components/ShoppingBag/ShoppingBag';
import Checkout from './Components/Checkout/Checkout';
import OrderConfirmation from './Components/Checkout/OrderConfirmation';
import OrderHistory from './Components/Orders/OrderHistory';
import Wishlist from './Components/Wishlist/Wishlist';
import { Box } from '@material-ui/core'

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{marginTop: 54}}>
            <Switch>
              <Route exact path= '/' component={Marketplace} />
              <Route exact path= '/cart' component={ShoppingBag} />
              <Route exact path= '/checkout' component={Checkout} />
              <Route exact path= '/order-confirmation/:id' component={OrderConfirmation} />
              <Route exact path= '/orders' component={OrderHistory} />
              <Route exact path= '/wishlist' component={Wishlist} />
              <Route exact path= '/product/:id' component={DetailView} />
              <Route component={NotFound} />
            </Switch>
          </Box>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
