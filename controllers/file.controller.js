
const path = require('path');
const fs = require('fs-extra');

const fileController = {};


fileController.getFile = ( req, resp ) => {

    const { collection, image} = req.params;

    const file = path.resolve(__dirname, `../public/uploads/${collection}/${image}`);

    if(fs.existsSync(file)){

      resp.sendFile(file);
    } else{

      const noImage = path.resolve(__dirname, '../assets/no-image/no-image.png');
      resp.sendFile(noImage);
    }

}



module.exports =  fileController;