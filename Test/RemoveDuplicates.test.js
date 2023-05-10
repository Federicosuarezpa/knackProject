const { removeDuplicates } = require('./index.js');

describe('removeDuplicates', () => {
    const originalArray = [
        { _id: 1, name: 'object1' },
        { _id: 2, name: 'object2' },
        { _id: 1, name: 'object1' },
        { _id: 3, name: 'object3' },
    ];

    it('should remove duplicate objects based on _id', () => {
        const expectedArray = [
            { _id: 1, name: 'object1' },
            { _id: 2, name: 'object2' },
            { _id: 3, name: 'object3' },
        ];
        const spy = jest.spyOn(console, 'log');
        const newArray = removeDuplicates(originalArray, '_id');
        expect(newArray).toEqual(expectedArray);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });

    it('should not modify the original array', () => {
        const spy = jest.spyOn(console, 'log');
        const newArray = removeDuplicates(originalArray, '_id');
        expect(newArray).not.toBe(originalArray);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });
});

