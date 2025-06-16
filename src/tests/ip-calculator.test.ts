import { ipToID } from '../utils/ip-calculator';

describe('ipToID', () => {
  test('should return a number', () => {
    const result = ipToID('0.0.0.0');
    expect(typeof result).toBe('number');
  });

  test('when receive 8.8.8.8 should return 134744072', () => {
    const result = ipToID('8.8.8.8');
    expect(result).toBe(134744072);
  });
});
