// src/export/export.controller.ts
import { Controller, Get, Param, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExportService } from './export.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('export')
@UseGuards(JwtAuthGuard)
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('csv')
  async exportAll(@Res() res: Response) {
    const csv = await this.exportService.exportAllSites();
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=all-sites.csv');
    res.send(csv);
  }

  @Get('csv/:id')
  async exportSite(@Param('id') id: string, @Res() res: Response) {
    const csv = await this.exportService.exportSite(id);
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', `attachment; filename=site-${id}.csv`);
    res.send(csv);
  }
}