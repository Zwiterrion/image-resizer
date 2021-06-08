const path = require('path');
const fs = require('fs');
const rimraf = require("rimraf");

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const sizes = require('./devices.json')

const EXCLUDE_FILES = [".DS_Store"];
const EXIT_FOLDER_PATH = "./out";

const clearOutDirectory = (root) => {
    const files = fs.readdirSync(root)

    for (const file of files) {
        rimraf.sync(`${EXIT_FOLDER_PATH}/${file}`);
    }
}

fs.readdir(path.join(__dirname, 'screenshots'), async function (err, _files) {
    const files = _files.filter(filename => !EXCLUDE_FILES.includes(filename))
    if (err)
        return console.log('Error on loading screenshots directory : ' + err);


    if (!fs.existsSync(EXIT_FOLDER_PATH))
        fs.mkdirSync(EXIT_FOLDER_PATH);
    else
        clearOutDirectory(EXIT_FOLDER_PATH);

    await Promise.all(sizes
        .devices
        .flatMap(folder => {
            if (!fs.existsSync(`${EXIT_FOLDER_PATH}/${folder.name}`))
                fs.mkdirSync(`${EXIT_FOLDER_PATH}/${folder.name}`);

            return files
                .map((filename, i) => {
                    return exec(`ffmpeg -i ${path.join(__dirname, 'screenshots', filename)} -vf "scale=w=${folder.size.w}:h=${folder.size.h}:force_original_aspect_ratio=1,pad=${folder.size.w}:${folder.size.h}:(ow-iw)/2:(oh-ih)/2" ${EXIT_FOLDER_PATH}/${folder.name}/${filename}`);
                })
        }));

    console.log(`${sizes.devices.length * files.length} generated files`)
});
