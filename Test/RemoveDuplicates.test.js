const { removeDuplicates, readJsonFile } = require('../Application/RemoveDuplicates');

describe('removeDuplicates', () => {
    it('should remove duplicate objects based on a key', () => {
        const input = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Alice' },
            { id: 4, name: 'Charlie' },
            { id: 5, name: 'Alice' },
        ];

        const expectedOutput = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 4, name: 'Charlie' },
        ];

        const actualOutput = removeDuplicates(input, 'name');

        expect(actualOutput).toEqual(expectedOutput);
    });
});

describe('readJsonFile', () => {
    it('should read and parse a valid JSON file', (done) => {
        const filename = './Files/mock_json.json';
        const expectedData = { foo: 'bar' };
        readJsonFile(filename, (error, data) => {
            expect(data).toEqual(expectedData);
            done();
        });
    });

    it('should return an error for an invalid JSON file', (done) => {
        const filename = './Files/error_json.txt';
        readJsonFile(filename, (error, data) => {
            expect(error.message).toEqual('File is not a valid JSON');
            expect(data).toBeUndefined();
            done();
        });
    });

    it('should return an error for a non-existent file', (done) => {
        const filename = 'non-existent.json';
        readJsonFile(filename, (error, data) => {
            expect(error.message).toMatch(/ENOENT/);
            expect(data).toBeUndefined();
            done();
        });
    });
});
