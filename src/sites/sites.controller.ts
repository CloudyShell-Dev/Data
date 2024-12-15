// src/sites/sites.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateMetricsDto } from './dto/update-metrics.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.sitesService.create(createSiteDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: PaginationQueryDto) {
    return this.sitesService.findAll(query);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.sitesService.findOne(id);
  }

  @Post(':id/metrics')
  @Public()
  updateMetrics(
    @Param('id') id: string,
    @Body() updateMetricsDto: UpdateMetricsDto,
  ) {
    return this.sitesService.updateMetrics(id, updateMetricsDto);
  }
}