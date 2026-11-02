import { test, expect } from '@playwright/test';

test('GET ข้อมูล Pikachu', async ({ request }) => {
  // ส่ง GET request ไปที่ PokéAPI
  const res = await request.get('https://pokeapi.co/api/v2/pokemon/pikachu');

  // ตรวจว่า status เป็น 200
  expect(res.status()).toBe(200);

  // อ่าน body เป็น JSON แล้วตรวจชื่อและ id
  const body = await res.json();
  expect(body.name).toBe('pikachu');
  expect(body.id).toBe(25);

  // ตรวจว่ามีธาตุไฟฟ้า (electric)
  expect(body.types[0].type.name).toBe('electric');
});