const Category = require('../models/category');

const categoryController = {};



categoryController.add = (req, resp) => {


  const category = new Category({
    name: req.body.name
  });


  category.save((error, categorySaved) => {

    if (error) {
      return resp.status(500).json({
        ok: false,
        errors: { message: 'Category not Saved', error }
      })
    }

    resp.status(200).json({
      success: true,
      category: categorySaved
    })
  });


}


categoryController.getAll = async (req, resp) => {

  try {
    const categories = await Category.find();
    resp.status(200).json({
      ok: true,
      categories
    })
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      errors: { message: 'Error al listar categorias', error }
    })
  }
}


categoryController.delete = async (req, resp) => {

  console.log(req.params.id)

  Category.findByIdAndDelete(req.params.id, (error, categoryDeleted) => {

    if (!categoryDeleted) {
      return resp.status(400).json({
        ok: false,
        errors: { message: 'category not deleted by id' }
      })
    }

    if (error) {
      return resp.status(500).json({
        success: false,
        errors: { message: 'Category not deleted', error }
      })
    }

    resp.status(200).json({
      success: true,
      message: 'Category deleted success',
      category: categoryDeleted
    })
  })

}

categoryController.update = (req, resp) => {

  const id = req.params.id;
  console.log(id)
  Category.findById(id, (error, categoryFounded) => {

    if (error) {

      return resp.status(500).json({
        success: false,
        errors: { message: 'Category not updated', error }
      })
    }

    if (!categoryFounded) {
      return resp.status(404).json({
        ok: false,
        errors: { message: `Not exist a Category by id: ${id}` }
      })
    }

    console.log(req.body.name)
    categoryFounded.name = req.body.name;

    categoryFounded.save((error, categoryUpdate) => {

      if (error) {
        return resp.status(500).json({
          ok: false,
          errors: { message: 'Category not updated', error }
        })
      }

      resp.status(200).json({
        ok: true,
        category: categoryUpdate
      })
    })
  })
}


module.exports = categoryController;