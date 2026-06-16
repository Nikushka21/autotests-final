const { test, expect, request } = require('@playwright/test');

test('POST - Create Post', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Мой тестовый пост',
      body: 'Создание поста через API автотест',
      userId: 1
    }
  });

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  expect(responseBody.title).toBe('Мой тестовый пост');
  expect(responseBody.userId).toBe(1);

  console.log('POST TEST PASSED');
});
test('GET - Valid Post', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.get(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  console.log('GET VALID TEST PASSED');
});
test('GET - Invalid Post', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.get(
    'https://jsonplaceholder.typicode.com/posts/999999'
  );

  expect(response.status()).toBe(404);

  console.log('GET INVALID TEST PASSED');
});
test('PUT - Update Post', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.put(
    'https://jsonplaceholder.typicode.com/posts/1',
    {
      data: {
        id: 1,
        title: 'Обновлённый пост',
        body: 'Это обновление через PUT запрос',
        userId: 1
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.title).toBe('Обновлённый пост');
  expect(body.id).toBe(1);

  console.log('PUT TEST PASSED');
});
test('DELETE - Remove Post', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.delete(
    'https://jsonplaceholder.typicode.com/posts/1'
  );

  expect([200, 204]).toContain(response.status());

  console.log('DELETE TEST PASSED');
});