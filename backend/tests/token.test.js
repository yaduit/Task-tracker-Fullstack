import jwt from "jsonwebtoken"

test("should generate valid token", () => {

  const token = jwt.sign(
    { id: 1 },
    'testsecret'
  )

  const decoded = jwt.verify(token, 'testsecret')

  expect(decoded.id).toBe(1)

});

test("should fail invalid token", () => {

  expect(() => {
    jwt.verify("invalid", "secret")
  }).toThrow()

});