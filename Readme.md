# Crypto Secure String

A simple and secure random string generator for your tokens, passwords, and keys. With just Two lines of code, you can generate random strings in various encoding formats (Base64, Hex, Alphanumeric) with customizable lengths.

## Features
- **Secure**: Uses Node's `crypto` module for random string generation.
- **Multiple Encodings**: Supports `base64`, `hex`, and `alphanumeric`.
- **Custom Length**: Set your own length for the generated string (default is 12).
- **Simple API**: Easy to use with minimal setup.

## Installation

Install the package via npm:

```bash
npm install crypto-secure-string
```

## Usage

Generate a random string in **Base64** (default encoding) with a length of 10:

```javascript
const secureRandomStr = require('crypto-secure-string');
console.log(secureRandomStr(10));  // Example output: '9l0XgFZcm9M='
```

Generate a random **Hex** string with a length of 16:

```javascript
console.log(secureRandomStr(16, 'hex'));  // Example output: 'e2f9b9b0560e3b9c'
```

Generate an **Alphanumeric** string with a length of 8:

```javascript
console.log(secureRandomStr(8, 'alphanumeric'));  // Example output: 'kY7G8fN2'
```

Generate a random string with **default length (12)** and **invalid encoding** will fall back to the first valid encoding type:

```javascript
console.log(secureRandomStr('invalid', 'hex'));  // Fallback to Hex encoding
```

## Valid Encodings
- `base64` (default)
- `hex`
- `alphanumeric` or `alnum`

## Error Handling
If an invalid length or encoding is provided, the function will throw an error or fallback to default values with a warning.


### Invalid Length
If an invalid length is provided (e.g., a negative number or a non-integer), the function will throw an error:

```javascript
const secureRandomStr = require('crypto-secure-string');

try {
  console.log(secureRandomStr(-5)); } // Invalid length
 catch (error) {
  console.error(error.message);}  // Error: Length must be a positive integer.

```

### Fallback Behavior
If the first argument is invalid, but the second argument is a valid encoding, the function will fall back to the valid encoding type, as shown below:

```javascript
const secureRandomStr = require('crypto-secure-string');

const result = secureRandomStr('invalid', 'hex');  // Fallback to Hex encoding
console.log(result);  // Example output: 'e2f9b9b0560e3b9c'
```

In this case, you will get a warning in the console, but the string will still be generated with the valid encoding type.
```

## License

MIT License. See [LICENSE](LICENSE) for more details.
```

---