import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';


// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		// add the given item to the cart
		console.log('item', item);
		const cartID = Date.now();
		const product = { ...item, cartID: cartID};

		setCart([...cart, product]);
		console.log('cart', cart);
	

	};

	const removeItem = item => {
		console.log('remove item', item.cartID)
		const newArray = cart.filter(function( obj ) {
			console.log(item);
			return obj.cartID !== item;
		});
		console.log('new array', newArray);
		setCart(newArray);
	}

	return (
		<ProductContext.Provider value={{ products, addItem, removeItem}}>
		<CartContext.Provider value={{ cart }}>
		<div className="App">
			<Navigation cart={cart} />

			{/* Routes */}
			<Route
				exact
				path="/"
				component={Products}
					/>
				

			<Route
				path="/cart"
				component={ShoppingCart} />
		</div>
		</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
