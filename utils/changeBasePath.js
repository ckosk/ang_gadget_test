const ajson = require('../angular.json');
const pjson = require('../package.json');
const fs = require('fs');
const gitRemoteOriginUrl = (...args) => import('git-remote-origin-url').then(({ default: fetch }) => fetch(...args));

gitRemoteOriginUrl().then(name => {
    let vals = name.split('/');
    let path = `https://${vals[3]}.github.io/${vals[4].split('.')[0]}/`

    console.log(`🌎 Configuring gadget deployment URL: ${path}${pjson.name}.xml`);

    // Update angular.json baseHref/deployUrl with full path to our app
    ajson.projects[pjson.name].architect.build.configurations.production.baseHref = path;
    ajson.projects[pjson.name].architect.build.configurations.production.deployUrl = path;

    fs.writeFile('./angular.json', JSON.stringify(ajson, null, 4), function writeJSON(err) {
        if (err) return console.log(err);
    });
})
