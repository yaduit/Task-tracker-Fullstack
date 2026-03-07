import request from "supertest"
import app from "../src/server.js"

describe("Auth API", () => {

  const email = `test${Date.now()}@mail.com`
  const badEmail = "not-an-email"

  test("should reject invalid registration", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ name: "", email: badEmail, password: "123" });
    expect(res.statusCode).toBe(400);
  });

  test("should register user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: email,
        password: "123456"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.role).toBe("user");
  });

  test("should login user and return role", async () => {

    const res = await request(app)
      .post("/auth/login")
      .send({
        email: email,
        password: "123456"
      })

    expect(res.statusCode).toBe(200)
    expect(res.body.user).toBeDefined()
    expect(res.body.user.role).toBe("user") // default role for registered user

    // also hit /me using the cookie that was just set
    const cookie = res.headers["set-cookie"][0]
    const me = await request(app)
      .get("/auth/me")
      .set("Cookie", cookie)
    expect(me.statusCode).toBe(200)
    expect(me.body.user.role).toBe("user")
  })

})