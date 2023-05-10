const fs = require('fs');

function removeDuplicates(array, key) {
    return array.filter(function(obj, index, self) {
        return index === self.findIndex(function(o) {
            return o[key] === obj[key];
        });
    });
}

function readJsonFile(filename, callback) {
    fs.readFile(filename, 'utf8', function(error, data) {
        if (error) {
            callback(error);
            return;
        }

        try {
            const jsonObject = JSON.parse(data);
            callback(null, jsonObject);
        } catch (error) {
            callback(new Error('File is not a valid JSON'));
        }
    });
}

function writeJsonFile(filename, jsonObject, callback) {
    fs.writeFile(filename, JSON.stringify(jsonObject), function(error) {
        if (error) {
            callback(error);
            return;
        }

        callback();
    });
}

function processJsonFile(filename, fileSave, callback) {
    readJsonFile(filename, function(error, jsonObject) {
        if (error) {
            callback(error);
            return;
        }

        if (!jsonObject.versions) {
            callback(new Error('Error: No versions available'));
            return;
        }

        jsonObject.versions.forEach(function(version) {
            version.objects = Object.values(version.objects.reduce(function(acc, obj) {
                acc[obj.key] = obj;
                return acc;
            }, {}));

            version.scenes = Object.values(version.scenes.reduce(function(acc, obj) {
                acc[obj.key] = obj;
                return acc;
            }, {}));

            version.objects.forEach(function(object) {
                object.fields = removeDuplicates(object.fields, '_id');
            });

            version.scenes.forEach(function(scene) {
                scene.views = removeDuplicates(scene.views, '_id');
            });
        });

        writeJsonFile(fileSave, jsonObject, function(error) {
            if (error) {
                callback(error);
                return;
            }

            console.log('File saved successfully');
            callback();
        });
    });
}

module.exports = { removeDuplicates, processJsonFile, readJsonFile };
