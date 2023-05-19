import Landing from '../pages/Landing/Landing';
import Home from '../pages/Home';
import Categories from '../pages/Products';
import IRoute from '../interfaces/route';
import Product from '../pages/Product';
import Onboarding from '../pages/Onboarding';
import CartPage from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmedPage from '../pages/OrderConfirmed';
import Profile from '../pages/Profile';

const routes: IRoute[] = [
  {
		path: '/',
		name: 'Landing',
		component: Landing,
		exact: true
	},
  {
		path: '/slides',
		name: 'Onboarding',
		component: Onboarding,
		exact: true
	},
  {
		path: '/home',
		name: 'Home',
		component: Home,
		exact: true
	},
  {
		path: '/perfil',
		name: 'Profile',
		component: Profile,
		exact: true
	},
  {
		path: '/tienda/carrito',
		name: 'Cart',
		component: CartPage,
		exact: true
	},
  {
		path: '/tienda/carrito/checkout',
		name: 'Checkout',
		component: Checkout,
		exact: true
	},
  {
		path: '/confirmacion',
		name: 'OrderConfirmation',
		component: OrderConfirmedPage,
		exact: true
	},
  {
		path: '/tienda/:category',
		name: 'Categories',
		component: Categories,
		exact: true
	},
  {
		path: '/tienda/producto/:productId',
		name: 'Product',
		component: Product,
		exact: true
	},
  {
		path: '**',
		name: 'Redirect',
		component: Home,
		exact: true
	},
]

export default routes;
