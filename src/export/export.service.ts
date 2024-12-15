// src/export/export.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Parser } from 'json2csv';
import { Metric, Site } from '@prisma/client';

type SiteWithMetrics = Site & {
  metrics: Metric[];
};

@Injectable()
export class ExportService {
  constructor(private prisma: PrismaService) {}

  private prepareSiteData(site: SiteWithMetrics) {
    const latestMetric = site.metrics[0];
    return {
      id: site.id,
      name: site.name,
      url: site.url,
      version: site.version,
      ipAddress: site.ipAddress,
      currentUptime: latestMetric?.uptime || 0,
      lastUpdate: latestMetric?.timestamp || null,
      createdAt: site.createdAt,
      updatedAt: site.updatedAt,
    };
  }

  async exportAllSites(): Promise<string> {
    const sites = await this.prisma.site.findMany({
      include: {
        metrics: {
          orderBy: {
            timestamp: 'desc',
          },
          take: 1,
        },
      },
    });

    const data = sites.map(this.prepareSiteData);
    const fields = [
      'id',
      'name',
      'url',
      'version',
      'ipAddress',
      'currentUptime',
      'lastUpdate',
      'createdAt',
      'updatedAt',
    ];

    const json2csvParser = new Parser({ fields });
    return json2csvParser.parse(data);
  }

  async exportSite(id: string): Promise<string> {
    const site = await this.prisma.site.findUnique({
      where: { id },
      include: {
        metrics: {
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });

    const siteData = this.prepareSiteData(site);
    const metricsData = site.metrics.map((metric) => ({
      siteId: metric.siteId,
      uptime: metric.uptime,
      timestamp: metric.timestamp,
    }));

    const fields = {
      site: [
        'id',
        'name',
        'url',
        'version',
        'ipAddress',
        'currentUptime',
        'lastUpdate',
        'createdAt',
        'updatedAt',
      ],
      metrics: ['siteId', 'uptime', 'timestamp'],
    };

    const siteParser = new Parser({ fields: fields.site });
    const metricsParser = new Parser({ fields: fields.metrics });

    return `Site Information:\n${siteParser.parse([siteData])}\n\nMetrics History:\n${metricsParser.parse(metricsData)}`;
  }
}