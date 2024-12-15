// src/sites/dto/update-metrics.dto.ts
import { IsNumber, Min, Max } from 'class-validator';

export class UpdateMetricsDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  uptime: number;
}