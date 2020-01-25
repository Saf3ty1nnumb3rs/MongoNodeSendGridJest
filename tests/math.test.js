const { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, add } = require('../src/math')

test('Should calculate total with tip', () => {
  const total = calculateTip(10, 0.3)
  expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10)
  expect(total).toBe(12.5)
})

test('Should convert Celsius to Fahrenheit', () => {
  const fahrenheit = celsiusToFahrenheit(10)
  expect(fahrenheit).toBe(50)
})

test('Should convert Fahrenheit to Celsius', () => {
  const celsius = fahrenheitToCelsius(50)
  expect(celsius).toBe(10)
})

test('Should add two numbers', done => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5)
    done()
  })
})

test('Should add two numbers', async done => {
  const sum = await add(2, 3)
  expect(sum).toBe(5)
  done()
})
