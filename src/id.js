const fs = require('fs');
const path = require('path');
const { Storage } = require('megajs');

async function uploadToMega(folderPath) {
  const storage = await new Storage({ email: 'vinnykaranja973@gmail.com', Kajara254@: 'vinnykaranja973@gmail.com' }).ready;
  const folder = await storage.mkdir(folderPath);
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const up = folder.upload(file);
    fs.createReadStream(filePath).pipe(up);
    await new Promise((resolve) => up.on('complete', resolve));
  }

  return folder.link();
}

module.exports = { uploadToMega };
    
