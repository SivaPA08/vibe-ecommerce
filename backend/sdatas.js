const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	image: String,
	description: String
});

const Product = mongoose.model('Product', productSchema);

const mockProducts = [
	{
		id: '1',
		name: 'Wireless Headphones',
		price: 3000,
		description: 'High-quality wireless headphones with noise cancellation',
		image: 'https://m.media-amazon.com/images/I/61UgZSYRllL.jpg'
	},
	{
		id: '2',
		name: 'Smart Watch',
		price: 1200,
		description: 'Fitness tracking smart watch with heart rate monitor',
		image: 'https://sc04.alicdn.com/kf/H258cc3bceab9484b9288c1030f66ee37J.jpg'
	},
	{
		id: '3',
		name: 'Laptop Stand',
		price: 1300,
		description: 'Ergonomic aluminum laptop stand for better posture',
		image: 'https://alogic.co/cdn/shop/files/Alogic_Elite_Power_Laptop_Stand_With_Wireless_Charger_Black_1.webp?v=1751890807&width=1200'
	},
	{
		id: '4',
		name: 'USB-C Hub',
		price: 780,
		description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
		image: 'https://m.media-amazon.com/images/I/61QbS525pgL.jpg'
	},
	{
		id: '5',
		name: 'Mechanical Keyboard',
		price: 2700,
		description: 'RGB mechanical gaming keyboard with blue switches',
		image: 'https://m.media-amazon.com/images/I/71g6wzBOsvL.jpg'
	},
	{
		id: '6',
		name: 'Wireless Mouse',
		price: 1020,
		description: 'Ergonomic wireless mouse with adjustable DPI',
		image: 'https://m.media-amazon.com/images/I/61qpQ7ZsSmL.jpg'
	},
	{
		id: '7',
		name: 'Phone Stand',
		price: 780,
		description: 'Adjustable phone stand for desk or bedside table',
		image: 'https://m.media-amazon.com/images/I/61igxtquV0L.jpg'
	},
	{
		id: '8',
		name: 'Webcam HD',
		price: 3680,
		description: '1080p HD webcam with built-in microphone',
		image: 'https://m.media-amazon.com/images/I/61-K2lXmHQL.jpg'
	},

	{
		id: '10',
		name: 'Portable Charger',
		price: 480,
		description: '20000mAh portable power bank with fast charging',
		image: 'https://m.media-amazon.com/images/I/71NVBNrF1pL._AC_UF894,1000_QL80_.jpg'
	}
];

async function seedDatabase() {
	try {
		// connecting mongodb
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');

		// clear existing products
		await Product.deleteMany({});
		console.log('Cleared existing products');

		// Inserting datas
		await Product.insertMany(mockProducts);
		console.log('Seeded 10 mock products');

		console.log('\n Products in database:');
		mockProducts.forEach(p => {
			console.log(`  - ${p.name} ($${p.price})`);
		});

		mongoose.connection.close();
		console.log('\n Database seeding complete!');
	} catch (error) {
		console.error(' Seeding error:', error);
		process.exit(1);
	}
}

seedDatabase();

