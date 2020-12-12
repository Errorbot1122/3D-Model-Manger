const mime = require('mime-types');
const fs = require('fs');

module.exports = (filePath) => {
  let fileExists = false;

  try {
    if (fs.existsSync(filePath)) {
      fileExists = true
    }
  } catch(err) {
    throw new Error(err);
  }

  if (fileExists) {

    let contentType = mime.lookup(filePath).split("/");
    let fileData = fs.readfileAsync(filePath, "binary");


    if (contentType[0] == "model") {
      switch (contentType[1]) {
        case "obj":
          
          break;
      }
    }
  }
};