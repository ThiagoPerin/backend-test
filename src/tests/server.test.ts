import { start, stop } from '../server';

describe('integration tests', () => {
  jest.setTimeout(15000);
  const PORT = 3999;
  const PATH = 'ip/location';

  beforeAll(async () => {
    await start(PORT);
  });

  afterAll(() => {
    stop();
  });

  test('should return 404 when the ip don\'t exist', async () => {
    const result = await fetch(`http://localhost:${PORT}/${PATH}?ip=256.256.256.256`);
    expect(result.status).toBe(404);
  });

  test('should return 200 when the ip exist', async () => {
    const result = await fetch(`http://localhost:${PORT}/${PATH}?ip=8.8.8.8`);
    expect(result.status).toBe(200);
  });
});
