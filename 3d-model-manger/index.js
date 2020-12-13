/* Defantions */

const mime = require('mime-types');
const fs = require('fs');

let vertexArray = []


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

  let arrayFilterd = array.filter((elem, i) => {
    if (IsString(elem)) {
      if (isReverse) {

        return !regex.test(elem)
      }
      else {

        return regex.test(elem)
      }
    }
    else {

      if (isReverse) {

        return true
      }
      else {

        false
      }
    }
  });
  return arrayFilterd;
};
function objLineToClass(item, type) {
  let output
  if (!IsString(item)) {return}
  let data = item.trim().split(" ");
  if (!IsString(type))  {
    type = data[0]
  }

  switch (type) {
    case "v":
      output = new Vertex(data[1], data[2], data[3], (data[4] != null) ? data[4] : null)
      break;
    case "f":
      output = new Face()
    default:
      output = false;
      break;
  }
  return output;
};

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

class BasePolygon {
  constructor(...vertices) {
    this.vertices = vertices
  }
}
class Polygon extends BasePolygon {
  constructor(...vertices) {
    super(vertices)
  }
}
class Face extends Polygon{
  constructor(v1, v2, v3, v4) {
    super(v1, v2, v3, v4)
    this.v1 = this.vertices[0]
    this.v2 = this.vertices[1]
    this.v3 = this.vertices[2]
    this.v4 = this.vertices[3]
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
}
function parseRead(Modeldata, options) {
  let keepComments = false
  let returnObject = {
    Vertexs: [],
  }

  if (IsObject(options)) {
    let keepComments = (IsBool(options.keepComments)) ? options.keepComments : false
  }

  let modelDataArray = Modeldata.modelData.trim().split("\n");


  if (!keepComments) {
    let modelDataArrayFilterd = filterRegex(modelDataArray, /^#/)

    modelDataArray = modelDataArrayFilterd
  }
  //console.log(modelDataArray)

  modelDataArray.forEach((item, i) => {

    if (IsString(item)) {
      let newItem = objLineToClass(item)

      if (newItem instanceof Vertex) {
        vertexArray.push(newItem) 
      }
    }
  });

  return returnObject;
};

/* Testing */

console.log(parseRead(readModel("../Test/cube.obj")));
//testVector = new Vector(1, 2, 4, 3);

/* Exports */
module.exports.readModel = readModel;
module.exports.parseRead = parseRead;
