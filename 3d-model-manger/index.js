/* Defantions */

const mime = require('mime-types');
const fs = require('fs');

function IsString(x) {
  return (typeof x === 'string' || x instanceof String)
}
function IsBool(x) {
  return (typeof x === 'boolean' || x instanceof Boolean)
}
function IsObject(x) {
  return (typeof x === 'object' || x instanceof Object)
}

class Vector {
  constructor(...values) {
    this.values = values
  }
}

class Vector3 extends Vector {
  constructor(x, y, z) {
    super(x, y, z)
  }
}

class Vertex {
  constructor(x, y, z) {

  }
}

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

function parseRead(Modeldata, options) {
  let keepComments = false

  if (IsObject(options)) {
    let keepComments = (IsBool(options.keepComments)) ? options.keepComments : false
  }


  let modelDataArray = Modeldata.modelData
    .trim()
    .split("\n");


  if (!keepComments) {
    removeCommentsRegex = /^#/

    modelDataArrayFilterd = modelDataArray.filter((elem, i) => {

      if (IsString(elem)) {

        return !removeCommentsRegex.test(elem)
      } else {

        return true
      }

    });

    modelDataArray = modelDataArrayFilterd
  }


}

/* Testing */

parseRead(readModel("../Test/cube.obj"));
testVector = new Vector(1, 2, 4, 3);

/* Exports */
module.exports.readModel = readModel;
module.exports.parseRead = parseRead;
