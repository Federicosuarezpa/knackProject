const { processJsonFile } = require('./RemoveDuplicates');

processJsonFile('./Files/mock_application.json', './Files/clean_application.json', function(error) {
    if (error) {
        console.error(error);
    }
});

