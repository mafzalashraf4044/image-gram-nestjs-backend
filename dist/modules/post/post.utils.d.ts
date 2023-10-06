import { ParsedCursor } from './interfaces';
export declare const generateAndEncryptCursor: (rank: number, createdAt: Date, key: string) => string;
export declare const decryptCursor: (encrypted: string, key: string) => ParsedCursor | null;
