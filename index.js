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
    if 
  }
}