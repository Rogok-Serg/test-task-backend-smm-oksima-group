import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.js";

import User from "../../models/Users.js";

const { DB_HOST, PORT } = process.env;

describe("test login route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(() => {});

  afterEach(async () => {});

  test("test login with correct data", async () => {
    const loginData = {
      email: "svetilnick.svetliy@gmail.com",
      password: "7777777",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    const user = await User.findOne({ email: loginData.email });

    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(loginData.email);

    expect(body.token).toBe(user.token);
    expect(body.user.profile).toBe(user.profile);
    expect(user.email).toBe(loginData.email);
  });
});
