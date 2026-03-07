import request from "supertest"
import app from "../src/server.js"

describe("Task API", () => {
  // create a user and preserve cookie across tests
  const email = `tsk${Date.now()}@mail.com`;
  let cookie;
  let taskId;

  beforeAll(async () => {
    await request(app)
      .post("/auth/register")
      .send({ name: "Task User", email, password: "123456" });

    const login = await request(app)
      .post("/auth/login")
      .send({ email, password: "123456" });

    cookie = login.headers["set-cookie"][0];
  });

  test("should fail creating task without auth", async () => {
    const res = await request(app)
      .post("/task")
      .send({ title: "Test Task" });

    expect(res.statusCode).toBe(401);
  });

  test("authenticated user can create / read / update / delete task", async () => {
    const create = await request(app)
      .post("/task")
      .set("Cookie", cookie)
      .send({ title: "Test Task" });

    expect(create.statusCode).toBe(201);
    expect(create.body.title).toBe("Test Task");
    taskId = create.body.id;

    const list = await request(app)
      .get("/task")
      .set("Cookie", cookie);
    expect(list.statusCode).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);

    const update = await request(app)
      .put(`/task/${taskId}`)
      .set("Cookie", cookie)
      .send({ status: "completed" });
    expect(update.statusCode).toBe(200);
    expect(update.body.status).toBe("completed");

    const del = await request(app)
      .delete(`/task/${taskId}`)
      .set("Cookie", cookie);
    expect(del.statusCode).toBe(200);
  });

  test("non-admin cannot call admin endpoints", async () => {
    const res = await request(app)
      .get("/admin/users")
      .set("Cookie", cookie);
    expect(res.statusCode).toBe(403);
  });
});