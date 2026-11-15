import { test, expect, request, APIRequestContext } from '@playwright/test';

// (5) สร้าง APIRequestContext ของเราเอง ตั้ง baseURL และ header (เช่น token) ไว้ครั้งเดียว
let api: APIRequestContext;

test.beforeAll(async () => {
  api = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
    extraHTTPHeaders: {
      Authorization: 'Bearer my-fake-token', // ใส่ token จริงตรงนี้
      'Content-Type': 'application/json',
    },
  });
});

test.afterAll(async () => {
  await api.dispose(); // ปิด context หลังเทสต์เสร็จ
});

// (1) ใช้ fixture `request` ที่ Playwright มีให้ ยิง GET
test('GET ด้วย request fixture', async ({ request }) => {
  const res = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  // (2) อ่าน status, headers และ body
  expect(res.status()).toBe(200);
  expect(res.ok()).toBeTruthy();
  expect(res.headers()['content-type']).toContain('application/json');

  const text = await res.text(); // body แบบข้อความดิบ
  expect(text.length).toBeGreaterThan(0);

  const body = await res.json(); // body แปลงเป็น object

  // (3) ตรวจรูปแบบ (schema) ของ response
  expect(body).toEqual({
    userId: expect.any(Number),
    id: 1,
    title: expect.any(String),
    body: expect.any(String),
  });
});

// (1) ยิง POST ส่งข้อมูลไปด้วย
test('POST สร้างข้อมูลใหม่', async () => {
  const res = await api.post('/posts', {
    data: { title: 'hello', body: 'world', userId: 1 },
  });

  expect(res.status()).toBe(201);
  const body = await res.json();
  // toMatchObject ตรวจแค่ field ที่ระบุ field อื่นมีเพิ่มได้
  expect(body).toMatchObject({ title: 'hello', userId: 1 });
  expect(body.id).toEqual(expect.any(Number));
});

// (4) ดึงค่าจาก response แรก ไปใช้ใน request ถัดไป
test('เรียกต่อกันเป็นทอด (chained)', async () => {
  // ขั้นที่ 1: ดึงโพสต์ แล้วเก็บ userId ไว้
  const postRes = await api.get('/posts/1');
  const { userId } = await postRes.json();

  // ขั้นที่ 2: เอา userId ไปดึงข้อมูลผู้ใช้
  const userRes = await api.get(`/users/${userId}`);
  expect(userRes.ok()).toBeTruthy();
  const user = await userRes.json();
  expect(user.id).toBe(userId);

  // ขั้นที่ 3: ใช้ query params ดึงโพสต์ทั้งหมดของผู้ใช้คนนี้
  const listRes = await api.get('/posts', { params: { userId } });
  const posts = await listRes.json();
  expect(Array.isArray(posts)).toBe(true);
  for (const p of posts) expect(p.userId).toBe(userId);
});
