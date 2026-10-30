import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import products from './seedData.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');

    // 1. Wipe Products, Orders, and Carts (Safe to reset)
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    console.log(' Old demo products, carts, and orders removed');

    const adminExists = await User.findOne({ email: 'admin@ecommerce.com' });
    
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      await User.create({
        name: 'Admin',
        email: 'admin@ecommerce.com',
        password: hashedPassword,
        isAdmin: true,
      });
      console.log(' Admin user created: admin@ecommerce.com / admin123');
    } else {
      console.log(' Admin user already exists (skipped)');
    }

    // 3. Insert the real, matched products
    const created = await Product.insertMany(products);
    console.log(`${created.length} real products added successfully!`);

    console.log('\n Seed complete! Your registered users are safe.');
    process.exit();
  } catch (error) {
    console.error(` Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();