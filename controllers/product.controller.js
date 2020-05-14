const Product = require('../models/product');
const fs = require('fs-extra');
const path = require('path');
const productController = {};


productController.all = async (req, resp) => {

  try {
    const products = await Product.find();
    resp.status(200).json({
      ok: true,
      products
    })
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      errors: { message: 'Error al listar los products', error }
    })
  }

}


productController.add = async (req, resp) => {

  const { title, price, description, category } = req.body;

  console.log(req.file)

  const product = new Product({ title, description, price, description, photo: req.file.filename, category });


  try {

    const productSaved = await product.save();
    resp.status(200).json({
      success: true,
      product: productSaved
    })
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      errors: { message: 'Error al insertar el producto', error }
    })
  }

}


productController.update = async (req, resp) => {

  const { collection, id } = req.params;

  console.log(collection)
  console.log(id)
  try {
    const product = await Product.findById(id);
    if (product) {
      const image = path.resolve(__dirname, `../public/uploads/${collection}/${product.photo}`)
    
       product.title = req.body.title;
       product.price = req.body.price;
       product.description = req.body.description;
       product.category = req.body.category;

       if(req.file){
        product.photo = req.file.filename
        if (fs.existsSync(image)) {
          await fs.unlink(image);
        }

       }
    const productSaved = await product.save();

    resp.status(200).json({
      success: true,
      product: productSaved
    })
    } else{

      return resp.status(404).json({
        ok: false,
        errors: { message: 'Producto no encontrado con id', id }
      })
    }
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      errors: { message: 'Error al actualizar el producto', error }
    })
  }
}

productController.delete =  (req, resp) => {

  Product.findByIdAndDelete(req.params.id, async ( error, productDeleted) => {

    if (!productDeleted) {
      return resp.status(400).json({
        ok: false,
        errors: { message: 'Product not deleted by id' }
      })
    }

    if (error) {
      return resp.status(500).json({
        success: false,
        errors: { message: 'Product not deleted', error }
      })
    }

    const image = path.resolve(__dirname, `../public/uploads/products/${productDeleted.photo}`)
    if (fs.existsSync(image)) {
      await fs.unlink(image);
    }
    resp.status(200).json({
      success: true,
      message: 'Category deleted success',
      product: productDeleted
    })
  })
}

module.exports = productController;