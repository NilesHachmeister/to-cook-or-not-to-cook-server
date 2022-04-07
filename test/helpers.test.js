const helpers = require('../utils/helpers');


// this file is made to test any helper functions we use
describe("helpers file", () => {
    describe("if the number is even or odd", () => {
        it("Should return true if even and odd if false", () => {
            expect(helpers.even_number_recipes(2)).toBe(true)
            expect(helpers.even_number_recipes(3)).toBe(false)
        })
    })
})