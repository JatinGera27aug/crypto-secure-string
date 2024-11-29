const secureRandomStr = require('../index');

test('Generates a 16-char hex string', () => {
    const result = secureRandomStr(16, 'hex');
    expect(result).toHaveLength(16);
    expect(result).toMatch(/^[a-f0-9]{16}$/);  // Must be a valid hex string
});

test('Generates a 12-char base64 string by default', () => {
    const result = secureRandomStr(12);  // Default encoding is 'base64'
    expect(result).toHaveLength(12);
    expect(result).toMatch(/^[a-zA-Z0-9+/=]{12}$/);  // Must be a valid base64 string
});

test('Generates a 10-char alphanumeric string', () => {
    const result = secureRandomStr(10, 'alphanumeric');
    expect(result).toHaveLength(10);
    expect(result).toMatch(/^[a-zA-Z0-9]{10}$/);  // Must be alphanumeric
});

test('Throws error when an invalid encoding is provided', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    secureRandomStr('invalid', 'hex');  // Invalid encoding type

    expect(consoleWarnSpy).toHaveBeenCalledWith(
    "Warning: Invalid encoding type 'invalid'. Defaulting to length 12 and encoding = 'hex'."
  );

  // Clean up the spy
  consoleWarnSpy.mockRestore();
});

test('Throws error when length is less than or equal to 0', () => {
    expect(() => {
      secureRandomStr(0, 'hex');
    }).toThrowError('Length must be a positive integer.');
  
    expect(() => {
      secureRandomStr(-5, 'base64');
    }).toThrowError('Length must be a positive integer.');
});

test('Uses default encoding when no encoding is provided', () => {
    const result = secureRandomStr(10);  // Default encoding is 'base64'
    expect(result).toHaveLength(10);
    expect(result).toMatch(/^[a-zA-Z0-9+/=]{10}$/);
});

test('Generates a long hex string', () => {
    const result = secureRandomStr(1000, 'hex');
    expect(result).toHaveLength(1000);
    expect(result).toMatch(/^[a-f0-9]{1000}$/);
});

test('Uses valid encoding if the first encoding type is invalid', () => {
    const result = secureRandomStr('dd', 'hex');  // Invalid first argument, valid second argument
    expect(result).toHaveLength(12);  // Default length 12
    expect(result).toMatch(/^[a-f0-9]{12}$/);  // Hex string with default length
});

test('Uses valid encoding if the second encoding type is invalid', () => {
    const result = secureRandomStr(10, 'dd');  // Valid first argument, invalid second argument
    expect(result).toHaveLength(10);  // Provided length
    expect(result).toMatch(/^[a-zA-Z0-9+/]+$/);  // Base64 string with provided length
});

test('Generates a long base64 string', () => {
    const result = secureRandomStr(1000, 'base64');
    expect(result).toHaveLength(1000);
    expect(result).toMatch(/^[a-zA-Z0-9+/=]{1000}$/);
  });
  