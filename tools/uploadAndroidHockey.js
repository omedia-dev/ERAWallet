const path = require("path");
const env = process.argv[2];

if (!env) {
    return showHelp();
}

const appSettings = require("../build/core/settings/AppCliSettings");
appSettings.settings.environment = env;

const settings = appSettings.settings.loadSettings();
const hockeyApp = require("gulp-hockeyapp");

function showHelp() {
    console.log(`
Usage: node ${__filename} production
Where "production" is environment. Available values is "production" and "development" and "stage". 
`);
}

const options = {
    id: settings.hockeyAppId,
    apiToken: settings.hockeyAppApiToken,
    inputFile: path.resolve(path.join("android", "app", "build", "outputs", "apk", "app-release.apk")),
    notify: 0,
    status: 2,
    //teamList: [1234, 5678]
};

hockeyApp.upload(options).then(
    function (response) {
        console.log("uploaded");
    },
    function (err) {
        console.log(err);
        throw err;
    }
);
