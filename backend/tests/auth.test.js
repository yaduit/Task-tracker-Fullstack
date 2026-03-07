import request from "supertest"
import app from "../src/server.js"

describe("Auth API", () => {

  const email = `test${Date.now()}@mail.com`

  test("should register user", async () => {

    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: email,
        password: "123456"
      })

    expect(res.statusCode).toBe(201)

  })

  test("should login user", async () => {

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: email,
        password: "123456"
      })

    expect(res.statusCode).toBe(200)

  })

})