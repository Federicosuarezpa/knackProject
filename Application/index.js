const fs = require('fs');

// Function to remove duplicates from an array of objects based on a specific key
function removeDuplicates(array, key) {
    return array.filter((obj, index, self) => {
        return index === self.findIndex((o) => o[key] === obj[key]);
    });
}

// Function to read a JSON file
function readJsonFile(filename, callback) {
    fs.readFile(filename, 'utf8', (error, data) => {
        if (error) {
            callback(error);
            return;
        }
        let jsonObject;
        try {
            jsonObject = JSON.parse(data);
        } catch (error) {
            callback('Error: File is not a valid JSON');
            return;
        }
        callback(null, jsonObject);
    });
}

// Function to write a JSON file
function writeJsonFile(fileSave, jsonObject, callback) {
    fs.writeFile(fileSave, JSON.stringify(jsonObject), function (error) {
        if (error) {
            callback("Error: Could not save file " + fileSave + ". " + error);
        } else {
            callback(null);
        }
    });
}

// Main function that calls the above functions to process the JSON file
function processJsonFile(filename, fileSave) {
    readJsonFile(filename, (error, jsonObject) => {
        if (error) {
            console.error(error);
            return;
        }
        if (!jsonObject['versions']) {
            console.log('Error: No versions available');
            return;
        }
        jsonObject['versions'].forEach((version) => {
            version['objects'].forEach((object) => {
                object['fields'] = removeDuplicates(object['fields'], '_id');
            });
            version['scenes'].forEach((scene) => {
                scene['views'] = removeDuplicates(scene['views'], '_id');
            });
        });
        writeJsonFile(fileSave, jsonObject, (error) => {
            if (error) {
                console.error(error);
                return;
            }

            // console.log('File saved successfully');
        });
    });
}

// Call the main function to process the JSON file
processJsonFile('../Files/mock_application.json', '../Files/clean_application.json');

module.exports = { removeDuplicates };

