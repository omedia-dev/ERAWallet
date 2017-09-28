const fs = require("fs");
const version = process.argv[2];
const build = process.argv[3];
if (!version || !build) {
    return showHelp();
}

updateGradleSettings();
updateSettings();
updateInfoPlist();

function showHelp() {
    console.log(`
Usage: node ${__filename} 1.2.3 123456
Where 1.2.3 is a version and 123456 is a build number
`);
}

function updateGradleSettings() {
    const path = "android/app/build.gradle";
    let data = fs.readFileSync(path).toString();
    data = data.replace(/versionCode \d+/, `versionCode ${build}`);
    data = data.replace(/versionName "[\d.]+"/, `versionName "${version}"`);
    fs.writeFileSync(path, data);
}

function updateSettings() {
    const path = "resources/settings/env.json";
    let data = fs.readFileSync(path).toString();
    data = data.replace(/"environment": "development",/, `"environment": "production",`);
    data = data.replace("\"build\": 1", `"build": ${build}`);
    data = data.replace("\"version\": \"1\"", `"version": "${version}"`);
    fs.writeFileSync(path, data);
}

function updateInfoPlist() {
    const path = "ios/datachan/Info.plist";
    let data = fs.readFileSync(path).toString();

    data = data.replace(/(.*)(CFBundleVersion.*\n*\s*\<string>)\d*(.*)/g, `$1$2${build}$3`);
    data = data.replace(/(<key>CFBundleShortVersionString<\/key>\s*<string>)(.+?)(<\/string>)/g, `$1${version}$3`);

    fs.writeFileSync(path, data);
}
