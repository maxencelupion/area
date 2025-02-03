import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly key: string;

  constructor(private configService: ConfigService) {
    this.key = configService.get<string>('app.crypto_key');
  }

  async encrypt(data: string): Promise<string> {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(this.key, 'salt', 32)) as Buffer;
    const cipher = createCipheriv(this.algorithm, key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const ivStr = iv.toString('hex');
    return `${ivStr}:${encrypted}`;
  }

  async decrypt(data: string): Promise<string> {
    const [ivStr, encryptedData] = data.split(':');
    const iv = Buffer.from(ivStr, 'hex');
    const key = (await promisify(scrypt)(this.key, 'salt', 32)) as Buffer;

    const decipher = createDecipheriv(this.algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
