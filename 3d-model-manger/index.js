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

function filterRegex(array, regex, isReverse = true) {
  let output = []
  let arrayFilterd = array.filter((elem, i) => {
    if (IsString(elem)) {
      if (isReverse) {

        output.push(!regex.test(elem))
      }
      else {

        output.push(regex.test(elem))
      }
    }
    else {

      if (isReverse) {

        output.push(true)
      }
      else {

        output.push(false)
      }
    }
  });

  return output;
}

function arrayToClass(array) {
  array.forEach((item, i) => {
    let data = item.trim().split(" ");

    let type = data[0];

    let output

    switch (data[0]) {
      case "v":
        output = new Vertex(data[1], data[2], data[3], (data[4] != null) ? data[4] : null)
        break;
      default:
        break;
    }

  });

}

class Vector {
  constructor(...values) {
    this.values = values
  }
}
class Vector3 extends Vector {
  constructor(x, y, z) {
    super(x, y, z)
    this.x = this.values[0]
    this.y = this.values[1]
    this.z = this.values[2]
  }
}
class Vertex extends Vector3 {
  constructor(x, y, z, w = 1) {
    super(x, y, z)
    this.w = w
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
  let returnArray

  if (IsObject(options)) {
    let keepComments = (IsBool(options.keepComments)) ? options.keepComments : false
  }


  let modelDataArray = Modeldata.modelData
    .trim()
    .split("\n");


  if (!keepComments) {
    let modelDataArrayFilterd = filterRegex(modelDataArray, /^#/)

    modelDataArray = modelDataArrayFilterd
  }

  modelDataArray.forEach((item, i) => {

    if (IsString(item)) {
      let vertexsFromRead = filterRegex(modelDataArray, vertexRegex, false)
      let vertexsFromReadClass = arrayToClass(modelDataArray)
    }
  });
}

/* Testing */

console.log(parseRead(readModel("../Test/cube.obj")));
//testVector = new Vector(1, 2, 4, 3);

/* Exports */
module.exports.readModel = readModel;
module.exports.parseRead = parseRead;
