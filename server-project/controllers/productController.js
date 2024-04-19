const { Resend } = require("resend");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new productModel({ ...productData });
    await newProduct.save();

    const allUsers = await userModel.find(); // Obtener todos los usuarios

    const productDetails = {
      name: newProduct.productName,
      discount: newProduct.discount,
      price: newProduct.price,
      priceWithDiscount: newProduct.priceWithDiscount,
      photo: newProduct.productPhoto,
    };

    for (const user of allUsers) {
      await sendProductEmail(user.email, productDetails);
    }

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const sendProductEmail = async (email, productDetails) => {
  const resend = new Resend("re_2iZQmZvV_G5TGuP32LHd3zUnMrDNWgqK7");
  try {
    await resend.emails.send({
      from: "Productos <onboarding@resend.dev>",
      to: [email],
      subject: "New Product with Discount Available",
      html: `
        <p>New Product Available:</p>
        <p>Name: ${productDetails.name}</p>
        <p>Discount: ${productDetails.discount}</p>
        <p>Real Price: ${productDetails.price}</p>
        <p>Discounted Price: ${productDetails.priceWithDiscount}</p>
        <img src="${productDetails.photo}" alt="Product Photo">
      `,
    });
    console.log(`Product email sent successfully to ${email}`);
  } catch (error) {
    console.error("Error sending product email:", error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      productData,
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const allUsers = await userModel.find(); // Obtener todos los usuarios

    const productDetails = {
      name: updatedProduct.productName,
      discount: updatedProduct.discount,
      price: updatedProduct.price,
      priceWithDiscount: updatedProduct.priceWithDiscount,
      photo: updatedProduct.productPhoto,
    };

    for (const user of allUsers) {
      await sendProductEmail(user.email, productDetails);
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};