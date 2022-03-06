import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomeScreen from './screens/home/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectedProductScreen from './screens/selected_product/SelectedProductScreen';
import CartScreen from './screens/cart/CartScreen';
import { Provider } from 'react-redux';
import store from './store';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import CheckoutScreen from './screens/checkout/CheckoutScreen';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<SelectedProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signup" element={<SignUpScreen />}></Route>
              <Route path="/signin" element={<SignInScreen />}></Route>
              <Route path="/profile" element={<ProfileScreen />}></Route>
              <Route path="/checkout" element={<CheckoutScreen />}></Route>
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
