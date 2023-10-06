const CryptoJS = require('crypto-js');

import { ParsedCursor } from './interfaces';

// Helper function to generate and encrypt a cursor
export const generateAndEncryptCursor = (
  rank: number,
  createdAt: Date,
  key: string,
): string => {
  const cursor = { rank, createdAt: createdAt.getTime() }; // Convert createdAt to Unix timestamp

  return CryptoJS.AES.encrypt(JSON.stringify(cursor), key).toString();
};

// Helper function to decrypt a cursor and get its values
export const decryptCursor = (
  encrypted: string,
  key: string,
): ParsedCursor | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, key);
    const cursor = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    // Ensure that the cursor object has the expected properties
    if (cursor && cursor.rank !== undefined && cursor.createdAt !== undefined) {
      return cursor;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};
