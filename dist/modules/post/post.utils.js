"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptCursor = exports.generateAndEncryptCursor = void 0;
const CryptoJS = require('crypto-js');
const generateAndEncryptCursor = (rank, createdAt, key) => {
    const cursor = { rank, createdAt: createdAt.getTime() };
    return CryptoJS.AES.encrypt(JSON.stringify(cursor), key).toString();
};
exports.generateAndEncryptCursor = generateAndEncryptCursor;
const decryptCursor = (encrypted, key) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, key);
        const cursor = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (cursor && cursor.rank !== undefined && cursor.createdAt !== undefined) {
            return cursor;
        }
        else {
            return null;
        }
    }
    catch {
        return null;
    }
};
exports.decryptCursor = decryptCursor;
//# sourceMappingURL=post.utils.js.map