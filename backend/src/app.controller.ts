import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Public } from './common/constants/metadata';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get the about.json page' })
  @ApiResponse({ status: 200, description: 'Services informations retrieved.' })
  @Public()
  @Get('about.json')
  async getAboutJson(@Req() req, @Res() res: Response) {
    return res.json({
      client: {
        // TODO:
        // Change host
        host: req.hostname,
      },
      server: {
        current_time: new Date().getTime(),
        services: await this.appService.getServices(),
      },
    });
  }
}
