// src/sites/dto/create-site.dto.ts
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;
}