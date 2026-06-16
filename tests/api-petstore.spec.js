const { test, expect } = require('@playwright/test');

const baseUrl = 'https://petstore.swagger.io/v2';

test('POST create user', async ({ request }) => {
  const response = await request.post(`${baseUrl}/user`, {
    data: {
      id: 1,
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "test@test.com",
      password: "123456",
      phone: "12345",
      userStatus: 1
    }
  });

  expect(response.status()).toBe(200);
});

test('GET user by username (valid)', async ({ request }) => {
  const response = await request.get(`${baseUrl}/user/testuser`);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.username).toBe("testuser");
});

test('GET user by username (invalid)', async ({ request }) => {
  const response = await request.get(`${baseUrl}/user/invalid_user_123`);

  expect([404, 400]).toContain(response.status());
});

test('PUT update user', async ({ request }) => {
  const response = await request.put(`${baseUrl}/user/testuser`, {
    data: {
      id: 1,
      username: "testuser",
      firstName: "Updated",
      lastName: "User",
      email: "updated@test.com",
      password: "123456",
      phone: "99999",
      userStatus: 1
    }
  });

  expect(response.status()).toBe(200);
});

test('DELETE user', async ({ request }) => {
  const response = await request.delete(`${baseUrl}/user/testuser`);

  expect([200, 204]).toContain(response.status());
});