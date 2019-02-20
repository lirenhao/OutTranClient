const NodeRSA = require('node-rsa');
const sha256 = require('sha256')

const privateKeyData = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCzaOYYqznhui7+VmUTkxZgDKtPB/opV5j9h47SkuExuq0obaWXH8RPRAXcAwO+dKemFIgBDHquDqPw5QFRrpxsEStvqas+KQ6l2IMMZlXzS5vJFA8VKr+SIveI03ijP+qQAF61ODKQ3EMkt8kaqR8FLQ9lPssImzUt1IMb7HydFl8GbR4unrs72DwlnD4B4M/DyH6EX22fDVRLDjiiwOYjMqdO+MDGA3ENJg67K/DvmvlGi3GyV1ffT5KlgjA/0fGky2e3x5KArA4ucV+DjgGplx751aLEMjrj/G13pZMFBMFNNl771XrNFTawEOXGoNj6A7ZnM4rDsSCBFzIwwGKvAgMBAAECggEAdECKqH16+htMjB2rTS3IF+DduE4w+Uz7o3yNPUFTjoep4EJ8RBqfd8VaDqAdcvHgGCvBnPxbGiH+dP/PBQCh9xyBCs/kWFj+VtSexhAhrY7WmUrYIx0aGTVzNEPjLdUixsCWndKWYWt4TniQZSglI5N5IF+57A+2O8YyVou8i4R3tdndRrGzcBmluRHBxIi79qqgPOzRuieCBiAc5MFyTi4Oe6CxSs2NrFvNnRWnEFh3e8bHe847JqHUGAfmYMTOj0M0Avzl9LqDUQFzFqeNra+On64u7+9J1M3KQcUaPHrzagX3bKC16XM6sgW2HmXAM90TVk897+F2oxjeEcqy4QKBgQDZiMvEiUQNIvUDGBuj4nwsySP2NlwPLuFyYPxraZ7QGZ1AndrkX/bHcn9V8JRunF/HfDST//VUT0joQBe+3OuZt5323U4Wx+ApTfhqFrQBu98UFiw8CSAh0gF0QPJgZpqiazPBPPqpm/unDrd1c+GErcvc8BbtUmfyFK94vEL8lwKBgQDTIk2lT3fqsgZ6TJ9RRjZxxGh4+KhJ4z7GNdIsGq0FadqsypwHXywLEi9Ai2Ufi2f/jHNfXPZ8iMxUtcL/N6UuV60BUNFSn3A6BjF8aVO/DllV04l7xNwAO51MboOrj+c1pu+ka94eEHrF/IUMCO/gxdB66IN+TisVrgI5XFLVqQKBgCohoX2WLFTzAUsxHyFVm0E9T7a+/oN+S/HQMPNIyJZ7b4Z1TFDQ+UXVui3V45mstaw4NSK4/zXuCSvaRf8UYJksA+8tG5Oz8IlvbX52mTSAw4rrZHPYPJ3wQ5HVhlv/Y1Gzu5lgixfQeyP26LdZ00LUOli3M2mRfUpYkUesBrlPAoGAUAPPE1hDpQFk7RJ+ymlmlsUNptLtzFq/3pRlG2vcqJGOWy/J5A1Qfr2chMSPRV4qwrFyw/BSRa3+ahgcV2a6Rg7aNQZw3fQorwTL2k98eoqwlpM9pldb3Qa6vU2gvvMhd7bVWSW8Hv612LSzo3T7m967/OiDdOmg8G1q0FxJ1EkCgYEAsOHxJ/9QAUa9V2qp1q72sXi3tWwlSjAYqdh80wAySjEJvV69EN57WO/kLaXKbtOtr1mIxgI/B3ZjnQ2s3AtTSfHrPLOh5Pzn3xw1JHP8v65df/wjV6WyfW8en6DTgZ0SwtN9rXzUAu71TPMhnU+WSje7OSvra/iD3SiVZj/bpHM=
-----END PRIVATE KEY-----`

const privateKey = new NodeRSA(privateKeyData, 'pkcs8', {
  environment: 'browser'
});

const sign = (data) => {
  const hashData = sha256(data);
  return privateKey.encryptPrivate(hashData, 'base64')
};

const publicKeyData = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvIqoYgiXUW4hT7mIrkpr9aBiO/ZvfkZ+Tm13luzG6SXFTsHDNeMmqN+jZwrCU0v8riFDHdSUO29DrGV7rLT+v2wg5YUri97b2iCf8FYrZVTiMuUakvIm06rNVaoQpzXf+T0Iez3noPK5FWTYU5+oyVFsLxATACfrMAAwEV1HPkvDnj1PbIBV1kcTT2j8a1fj4sHUjhIHD4Cv8m2xQZg0sNc72LC1glMDiItd4vIZgTkHZQHvfgyFvj8Zw6xgTrfzshQJb2qe7tOSMF32vxSwZi8EEU5BBKQd7MOQFFIxr5hw1hLxUKFc4yTU51+DWYO23hMZz0hXsQMEzUsisSoZqwIDAQAB
-----END PUBLIC KEY-----`

const publicKey = new NodeRSA(publicKeyData, 'pkcs8-public', {
  environment: 'browser'
});

const verity = (data, sign) => {
  const dataHash = sha256(data);
  const signHash = publicKey.decryptPublic(new Buffer(sign, 'base64')).toString();
  return dataHash === signHash
}

module.exports = {
  sign,
  verity
}
