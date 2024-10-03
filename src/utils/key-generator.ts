import { generateKeyPair } from "crypto";

export const GenerateKeyPairs: () => Promise<{
  publicKey: string;
  privateKey: string;
}> = async () => {
  return new Promise((yes, no) => {
    generateKeyPair(
      "rsa",
      {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
          cipher: "aes-256-cbc",
          passphrase: process.env.TOP_SECRET_PASS_PHRASE,
        },
      },
      (err, publicKey, privateKey) => {
        if (err) return no(err);
        yes({
          publicKey,
          privateKey,
        });
      }
    );
  });
};
