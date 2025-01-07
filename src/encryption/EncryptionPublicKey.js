import JSEncrypt from "jsencrypt";

export default async function EncryptionPublicKey(data) {
  const publicKeyStr =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtZmOhLn1UGYNKOr9Uc3+yfJacnVBsO2gUqwrkBZNZ4GCwR3FW9Fkttly/uPD0cUQ6uJbRAasXjjrhfv2cKiT6YHE4YOZY1X1QdFXylLb9eRGHwwkLu/GwaNgTRfT4uQ/ZR/p8x+tailmwZED25YWWLkJ0jtZ7up2qJCXDrIlj4/WQWzLhxlsbYXIPWP34BArdkWH4T0hMF8tpOQsjVEKig4wQQnTeuD7MqdTxvx1gcRG0mWFD7zPSfL660AkiNKuv74VuI9lr5ppsaohwHzetpntPlufLrcHKMGPRonvcoTEdu0911ML6hpcLdQG00GkL00CJVbwfKo+q4NZXaPo6QIDAQAB";

  function encryptAndEncode(data, publicKey) {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    const encrypted = encryptor.encrypt(data);
    return encrypted;
  }

  const encrypted = await encryptAndEncode(JSON.stringify(data), publicKeyStr);

  return encrypted;
}
