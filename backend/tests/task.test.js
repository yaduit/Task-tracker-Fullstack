import request from "supertest"
import app from "../src/server.js"

describe("Task API", () => {

  test("should fail creating task without auth", async () => {

    const res = await request(app)
      .post("/task")   
      .send({
        title: "Test Task"
      })

    expect(res.statusCode).toBe(401)

  })

})