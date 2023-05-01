const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();
let mongoServer;
let db;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  db = await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
describe("ALL TEST CASES", () => {
  describe("CHECK IF PASSWORD AND REPASSWORD ARE NOT SAME", () => {
    test("SHOULD RESPOND WITH 400 STATUS CODE", async () => {
      const response = await request(app).post("/api/create/user").send({
        firstname: "ftestuser1",
        lastname: "ltestuser1",
        username: "t1",
        email: "t1@gmail.com",
        password: "t123",
        repassword: "t12345",
      });
      expect(response.statusCode).toBe(400);
    });
    test("SHOULD RETURN A JSON OBJECT", async () => {
      const response = await request(app).post("/api/create/user").send({
        firstname: "ftestuser1",
        lastname: "ltestuser1",
        username: "t1",
        email: "t1@gmail.com",
        password: "t123",
        repassword: "t12345",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("CHECK IF CORRECT JSON OBJECT RETURNED", async () => {
      const response = await request(app).post("/api/create/user").send({
        firstname: "ftestuser1",
        lastname: "ltestuser1",
        username: "t1",
        email: "t1@gmail.com",
        password: "t123",
        repassword: "t12345",
      });
      expect(response.body).toHaveProperty("msg", "Password did not match");
    });
  });
  describe("CHECK IF EVERYTHING IS CORRECT", () => {
    test("SHOULD RESPOND WITH 200 STATUS CODE", async () => {
      const response = await request(app).post("/api/create/user").send({
        firstname: "ftestuser2",
        lastname: "ltestuser2",
        username: "t2",
        email: "t2@gmail.com",
        password: "t123",
        repassword: "t123",
      });
      expect(response.statusCode).toBe(200);
    });
    test("SHOULD RETURN A JSON OBJECT", async () => {
      const response = await request(app).post("/api/create/user").send({
        firstname: "ftestuser2",
        lastname: "ltestuser2",
        username: "t2",
        email: "t2@gmail.com",
        password: "t123",
        repassword: "t123",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("CHECK IF CORRECT JSON OBJECT RETURNED", async () => {
      const response = await request(app).post("/api/create/user").send({
        firstname: "ftestuser2",
        lastname: "ltestuser2",
        username: "t2",
        email: "t2@gmail.com",
        password: "t123",
        repassword: "t123",
      });
      expect(response.body).toHaveProperty(
        "msg",
        "User Registered",
        "user",
        "accessToken"
      );
    });
  });
  describe("CHECK IF USER EXISTS WHEN LOGGING IN", () => {
    test("IF USER DOES NOT EXIST RETURN STATUS CODE 400", async () => {
      const response = await request(app).post("/api/login").send({
        email: "t98@gmail.com",
        password: "t123",
      });
      expect(response.statusCode).toBe(400);
    });
    test("SHOULD RETURN A JSON OBJECT", async () => {
      const response = await request(app).post("/api/login").send({
        email: "t98@gmail.com",
        password: "t123",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("CHECK IF CORRECT JSON OBJECT RETURNED", async () => {
      const response = await request(app).post("/api/login").send({
        email: "t98@gmail.com",
        password: "t123",
      });
      expect(response.body).toHaveProperty("msg", "User does not exist!!!");
    });
  });
  describe("IF LOGIN IS VALID", () => {
    test("IF USER EXIST & CREDENTIALS ARE CORRECT RETURN STATUS CODE 400", async () => {
      const response = await request(app).post("/api/login").send({
        email: "t2@gmail.com",
        password: "t123",
      });
      expect(response.statusCode).toBe(200);
    });
    test("SHOULD RETURN A JSON OBJECT", async () => {
      const response = await request(app).post("/api/login").send({
        email: "t2@gmail.com",
        password: "t123",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    test("CHECK IF CORRECT JSON OBJECT RETURNED", async () => {
      const response = await request(app).post("/api/login").send({
        email: "t2@gmail.com",
        password: "t123",
      });
      expect(response.body).toHaveProperty("user");
    });
  });
});
