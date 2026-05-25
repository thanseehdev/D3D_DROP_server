const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadToCloudinary = (buffer) => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'd3ddrops' },
    (err, result) => err ? reject(err) : resolve(result)
  );
  streamifier.createReadStream(buffer).pipe(stream);
});

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, sizes } = req.body;
    const result = await uploadToCloudinary(req.file.buffer);
    const product = await Product.create({
      name,
      price: Number(price),
      description,
      category,
      sizes: JSON.parse(sizes),
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });
    res.status(201).json(product);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    if (product.cloudinaryId) await cloudinary.uploader.destroy(product.cloudinaryId);
    await product.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
