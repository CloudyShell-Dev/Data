// src/assets/assets.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class AssetsService {
  private readonly assetsPath = join(process.cwd(), 'assets');

  getSvg(type: string): string {
    try {
      const path = join(this.assetsPath, `${type}.svg`);
      return readFileSync(path, 'utf-8');
    } catch (error) {
      throw new NotFoundException(`SVG ${type} not found`);
    }
  }
}