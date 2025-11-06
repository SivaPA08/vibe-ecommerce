const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//cors config
app.use(cors({
	origin: process.env.FRONTEND_URL || 'http://localhost:8080'
}));
app.use(express.json());

// mongodb connection
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log(' Connected to MongoDB'))
	.catch((err) => console.error('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	image: String,
	description: String
});

const Product = mongoose.model('Product', productSchema);

const cartItemSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	productId: { type: String, required: true },
	productName: { type: String, required: true },
	price: { type: Number, required: true },
	qty: { type: Number, required: true, min: 1 },
	createdAt: { type: Date, default: Date.now }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

const orderSchema = new mongoose.Schema({
	total: { type: Number, required: true },
	timestamp: { type: Date, default: Date.now },
	items: [Object],
	customerName: { type: String, required: true, maxlength: 100 },
	customerEmail: { type: String, required: true, maxlength: 255 }
});

const Order = mongoose.model('Order', orderSchema);

// API Endpoints

app.get('/api/products', async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		console.error('Error fetching products:', error);
		res.status(500).json({ error: 'Failed to fetch products' });
	}
});

app.get('/api/cart', async (req, res) => {
	try {
		const items = await CartItem.find();
		const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
		res.json({ items, total });
	} catch (error) {
		console.error('Error fetching cart:', error);
		res.status(500).json({ error: 'Failed to fetch cart' });
	}
});

app.post('/api/cart', async (req, res) => {
	try {
		const { productId, qty } = req.body;

		if (!productId || !qty || qty < 1) {
			return res.status(400).json({ error: 'Invalid productId or quantity' });
		}

		//finding product
		const product = await Product.findOne({ id: productId });
		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		const existingItem = await CartItem.findOne({ productId });

		if (existingItem) {
			existingItem.qty += qty;
			await existingItem.save();
			res.json(existingItem);
		} else {
			const cartItem = new CartItem({
				id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
				productId: product.id,
				productName: product.name,
				price: product.price,
				qty
			});
			await cartItem.save();
			res.status(201).json(cartItem);
		}
	} catch (error) {
		console.error('Error adding to cart:', error);
		res.status(500).json({ error: 'Failed to add to cart' });
	}
});

app.delete('/api/cart/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await CartItem.findOneAndDelete({ id });

		if (!result) {
			return res.status(404).json({ error: 'Cart item not found' });
		}

		res.json({ message: 'Item removed from cart' });
	} catch (error) {
		console.error('Error removing from cart:', error);
		res.status(500).json({ error: 'Failed to remove from cart' });
	}
});

app.post('/api/checkout', async (req, res) => {
	try {
		const { cartItems, name, email } = req.body;

		// Validation
		if (!cartItems || cartItems.length === 0) {
			return res.status(400).json({ error: 'Cart is empty' });
		}
		if (!name || name.trim().length < 2 || name.length > 100) {
			return res.status(400).json({ error: 'Invalid name (2-100 characters required)' });
		}
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
			return res.status(400).json({ error: 'Invalid email address' });
		}

		const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

		// Create order
		const order = new Order({
			total,
			timestamp: new Date(),
			items: cartItems,
			customerName: name.trim(),
			customerEmail: email.trim()
		});
		await order.save();

		// Clear cart
		await CartItem.deleteMany({});

		// Return receipt
		res.json({
			total,
			timestamp: order.timestamp.toISOString(),
			items: cartItems,
			customerName: name.trim(),
			customerEmail: email.trim()
		});
	} catch (error) {
		console.error('Error processing checkout:', error);
		res.status(500).json({ error: 'Failed to process checkout' });
	}
});

app.get('/health', (req, res) => {
	res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
	console.log(` Server running on http://localhost:${PORT}`);
});
