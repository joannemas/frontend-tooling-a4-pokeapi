const calculate = require('../src/js/calculate')

test('total calculate', () => {
  const numbers = [1, 2, 3, 4, 5]
  const result = calculate(numbers)

  expect(result).toBe(15)
})
