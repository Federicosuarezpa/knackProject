## Remove Duplicates From Mock Knack Application Schema

Simple Node.js application which can remove duplicates from Knack application schema.

Basically it reads the JSON file, loops over every version it
has and also over every object -> fields && scene -> view. 

The code filters to check if there are multiple values with the same '_id' and it returns only one.
After that, we only save the original Json with the modified data and not duplicated values.

### Available functionalities
- _node .\index.js_ to run the application, the new file will be saved on ./Files/clean_application.json
- _npm test_ to run the tests
