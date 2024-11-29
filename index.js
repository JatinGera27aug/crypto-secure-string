const crypto = require('crypto');

const secureRandomStr = (lengthOrEncoding = 12, encoding = 'base64') => {
  let length = 12; // Default length

  // Determine if the first argument is the encoding type
  if (typeof lengthOrEncoding === 'string' && typeof encoding === 'string') {
    if (!['base64', 'hex', 'alphanumeric'].includes(lengthOrEncoding)) {
      if (['base64', 'hex', 'alphanumeric'].includes(encoding)) {
        // If the first argument is invalid but the second is valid
        console.warn(`Warning: Invalid encoding type '${lengthOrEncoding}'. Defaulting to length 12 and encoding = '${encoding}'.`);
      } else {
        // If both arguments are invalid
        throw new Error('both encoding types are invalid.');
      }
    } else {
      encoding = lengthOrEncoding;
      length = 12; // Default length
    }
  } else if (typeof lengthOrEncoding === 'string') {
    encoding = lengthOrEncoding; // Treat first argument as encoding
  } else if (typeof lengthOrEncoding === 'number') {
    length = lengthOrEncoding; // Treat first argument as length
    if (typeof encoding !== 'string') {
      throw new Error('Second argument must be a string if the first argument is a number.');
    }
    else if(typeof encoding === 'string' && !['base64', 'hex', 'alphanumeric'].includes(encoding)){
      // throw new Error('Second argument must be a valid encoding type.')
      encoding = 'base64'
    }
  } else {
    throw new Error('First argument must be a positive integer (length) or a valid encoding type.');
  }

  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('Length must be a positive integer.');
  }
  if (!['base64', 'hex', 'alphanumeric'].includes(encoding)) {
    throw new Error('Encoding must be one of the following: base64, hex, alphanumeric.');
  }

  // Generate the random string based on encoding
  const bytes = crypto.randomBytes(Math.ceil(length));
  if (encoding === 'base64') {
    return bytes.toString('base64').slice(0, length).replace(/[^a-zA-Z0-9+/=]/g, '');
  } else if (encoding === 'hex') {
    return bytes.toString('hex').slice(0, length);
  } else if (encoding === 'alphanumeric' || encoding === 'alnum') {
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomBytes(1)[0] % alphanumericChars.length;
      result += alphanumericChars[randomIndex];
    }
    return result;
  }
};

console.log(secureRandomStr('10','hex'))
module.exports = secureRandomStr;
