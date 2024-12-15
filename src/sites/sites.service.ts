// src/sites/sites.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateMetricsDto } from './dto/update-metrics.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class SitesService {
  constructor(private prisma: PrismaService) {}

  async create(createSiteDto: CreateSiteDto) {
    return this.prisma.site.create({
      data: createSiteDto,
    });
  }

  async findOne(id: string) {
    const site = await this.prisma.site.findUnique({
      where: { id },
      include: {
        metrics: {
          orderBy: {
            timestamp: 'desc'
          },
          take: 1
        }
      }
    });

    if (!site) {
      throw new NotFoundException(`Site #${id} not found`);
    }

    return site;
  }

  async updateMetrics(id: string, updateMetricsDto: UpdateMetricsDto) {
    const site = await this.findOne(id);

    return this.prisma.metric.create({
      data: {
        siteId: site.id,
        uptime: updateMetricsDto.uptime,
      }
    });
  }

  async findAll(query: PaginationQueryDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const [items, total] = await Promise.all([
      this.prisma.site.findMany({
        skip,
        take: limit, // Maintenant c'est un nombre
        include: {
          metrics: {
            orderBy: {
              timestamp: 'desc'
            },
            take: 1
          }
        }
      }),
      this.prisma.site.count()
    ]);
  
    return {
      items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }
}