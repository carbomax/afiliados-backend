const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null , `./public/uploads/${req.params.collection}`);
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});


//will be using this for uplading
const upload = multer({ storage: storage });


module.exports = upload;

