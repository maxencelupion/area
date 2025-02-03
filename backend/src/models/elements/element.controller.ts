import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { Element } from './entities/element.entity';
import { ElementService } from './element.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Public } from 'src/common/constants/metadata';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('elements')
@Controller()
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Get('elements')
  @Public()
  @ApiOperation({ summary: 'Get all elements' })
  @ApiResponse({
    status: 200,
    description: 'List of elements retrieved successfully.',
  })
  @ApiResponse({ type: [Element] })
  async getAll(): Promise<Element[]> {
    return await this.elementService.findAll();
  }

  @Get('elements/:id')
  @Public()
  @ApiOperation({ summary: 'Get information about an element' })
  @ApiResponse({
    status: 200,
    description: 'Informations retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ type: Element })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.elementService.findOne(id);
  }

  @Get('actions')
  @Public()
  @ApiOperation({ summary: 'Get all actions' })
  @ApiResponse({
    status: 200,
    description: 'List of actions retrieved successfully.',
  })
  @ApiResponse({ type: [Element] })
  async getAllActions() {
    return await this.elementService.findActions();
  }

  @Get('actions/me')
  @ApiOperation({ summary: 'Get all actions available for the user' })
  @ApiResponse({
    status: 200,
    description: 'List of actions retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ type: [Element] })
  async getMyActions(@Req() request) {
    return await this.elementService.findUserActions(request.user.userId);
  }

  @Get('reactions')
  @Public()
  @ApiOperation({ summary: 'Get all reactions' })
  @ApiResponse({
    status: 200,
    description: 'List of reactions retrieved successfully.',
  })
  @ApiResponse({ type: [Element] })
  async getAllReactions() {
    return await this.elementService.findReactions();
  }

  @Get('reactions/me')
  @ApiOperation({ summary: 'Get all reactions available for the user' })
  @ApiResponse({
    status: 200,
    description: 'List of reactions retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ type: [Element] })
  async getMyReactions(@Req() request) {
    return await this.elementService.findUserReactions(request.user.userId);
  }
}
