import { Controller, Get, Param, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { AssetsService } from './assets.service';
import { Public } from '../common/decorators/public.decorator';
import { join } from 'path';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('svg/:type')
  @Public()
  @Header('Content-Type', 'image/svg+xml')
  getSvg(@Param('type') type: string) {
    return this.assetsService.getSvg(type);
  }

  @Get('client/cloudyshell-client.min.js')
  @Public()
  @Header('Content-Type', 'application/javascript')
  getClient(@Res() res: Response) {
    const clientPath = join(process.cwd(), 'dist', 'cloudyshell-client.min.js');
    return res.sendFile(clientPath);
  }
}