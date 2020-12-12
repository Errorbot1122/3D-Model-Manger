/* Defantions */

const mime = require('mime-types');
const fs = require('fs');

function readModel(filePath) {
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
    let fileData = fs.readFileSync(filePath, "utf8");

    if (contentType[0] == "model") {
    return {
            modelType: contentType[1],
            modelData: fileData,
          };

    }
  }
};

function parseRead(Modeldata) {
  console.log(Modeldata.modelData)
}

/* Testing */
parseRead(readModel("../Test/cube.obj"));

/* Exports */
module.exports.readModel = readModel;
module.exports.parseRead = parseRead;
