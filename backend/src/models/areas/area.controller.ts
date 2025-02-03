import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Area, AreaDto, CreateAreaDto } from './dto/create-area.dto';
import { AreaService } from './area.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AreaReactionService } from '../areasReactions/areaReaction.service';
import { CreateAreaReactionDto } from '../areasReactions/dto/create-areaReaction.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AreaRegistry } from './area-classes/area-registry.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Areas')
@ApiBearerAuth('access-token')
@Controller('areas')
export class AreaController {
  constructor(
    private readonly areaService: AreaService,
    private readonly areaReactionService: AreaReactionService,
    private readonly areaRegistry: AreaRegistry,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all areas created by the user' })
  @ApiResponse({
    status: 200,
    description: 'List of areas retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ type: [Area] })
  async getUserArea(@Req() request) {
    const userId = request.user.userId;
    return await this.areaService.findAllByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get information about an area' })
  @ApiResponse({
    status: 200,
    description: 'Information retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ type: Area })
  async getAreaById(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const userId = request.user.userId;
    const area = await this.areaService.findOneInfo(id);
    if (!area) {
      throw new BadRequestException(`No area with id ${id}`);
    }
    if (userId != area.userId) {
      throw UnauthorizedException;
    }
    return area;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new area' })
  @ApiResponse({ status: 201, description: 'Ressource created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request: creation failed' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiBody({ type: AreaDto })
  async createNewArea(@Body() body: AreaDto, @Req() request) {
    const newAreaAction: CreateAreaDto = {
      name: body.name,
      description: body.description,
      actionId: body.actionId,
      parameter: body.parameter,
      active: body.active,
      last_executed: new Date(),
      userId: request.user.userId,
      color: body.color,
    };
    const areaCreate = await this.areaService.create(newAreaAction);
    for (const reaction of body.reactions) {
      const newAreaReaction: CreateAreaReactionDto = {
        parameter_reaction: reaction.parameter_reaction,
        order: reaction.order,
        elementId: reaction.elementId,
        areaId: areaCreate.id,
      };
      await this.areaReactionService.create(newAreaReaction);
    }
    await this.areaRegistry.registerElement(areaCreate);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an area' })
  @ApiResponse({ status: 200, description: 'Ressource updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request: update failed' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiBody({ type: AreaDto })
  async updateAreaById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AreaDto,
    @Req() request,
  ) {
    const userId = request.user.userId;
    const areaAction = await this.areaService.findOne(id);
    if (!areaAction) {
      throw new BadRequestException(`No area with id ${id}`);
    }
    if (userId != areaAction.userId) {
      throw UnauthorizedException;
    }
    const newAreaAction: CreateAreaDto = {
      name: body.name,
      description: body.description,
      actionId: body.actionId,
      parameter: body.parameter,
      active: body.active,
      last_executed: new Date(),
      userId: request.user.userId,
      color: body.color,
    };
    const tmp1 = this.areaService.update(id, newAreaAction);
    const tmp2 = this.areaReactionService.removeByAction(id);
    await Promise.all([tmp1, tmp2]);
    const newArea = await this.areaService.findOne(id);
    for (const reaction of body.reactions) {
      const newAreaReaction: CreateAreaReactionDto = {
        parameter_reaction: reaction.parameter_reaction,
        order: reaction.order,
        elementId: reaction.elementId,
        areaId: id,
      };
      await this.areaReactionService.create(newAreaReaction);
    }
    await this.areaRegistry.registerElement(newArea);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an area' })
  @ApiResponse({ status: 200, description: 'Ressource deleted successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  async deleteAreaById(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const userId = request.user.userId;
    const areaAction = await this.areaService.findOne(id);
    if (userId != areaAction.userId) {
      throw UnauthorizedException;
    }
    await this.areaReactionService.removeByAction(areaAction.id);
    await this.areaService.remove(areaAction.id);
    await this.areaRegistry.unregisterElement(areaAction.id);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Change status of area (active/desactive)' })
  @ApiResponse({ status: 200, description: 'Ressource updated successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  async changeStatus(@Param('id', ParseIntPipe) id: number) {
    this.areaRegistry.getElement(id).changeStatus();
    return await this.areaService.changeStatus(id);
  }
}
