const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '..', 'resources', 'license');
const files = fs.readdirSync(dir)
    .filter(f => f.split('.').pop() === 'html');
files.forEach(file => {
    const filePath = path.resolve(dir, file);
    const html = fs.readFileSync(filePath).toString();
    const obj = {html};
    const json = JSON.stringify(obj);
    const jsonFile = filePath.replace(/html$/, 'json');
    fs.writeFileSync(jsonFile, json);
});
