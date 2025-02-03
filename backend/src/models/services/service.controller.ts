import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateServiceDto, Status } from './dto/create-service.dto';
import { Service } from './entities/service.entity';
import { ServiceManager } from './service-manager.service';
import { UpdateResult } from 'typeorm';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Public } from 'src/common/constants/metadata';
import { ElementService } from '../elements/element.service';
import { ServiceTokenService } from '../servicesTokens/serviceToken.service';
import { Element } from '../elements/entities/element.entity';
import { AreaService } from '../areas/area.service';
import { AreaRegistry } from '../areas/area-classes/area-registry.service';
import { AreaReactionService } from '../areasReactions/areaReaction.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Services')
@ApiBearerAuth('access-token')
@Controller('services')
export class ServiceController {
  constructor(
    private readonly servicesManager: ServiceManager,
    private readonly serviceTokenService: ServiceTokenService,
    private readonly elementService: ElementService,
    private readonly areaService: AreaService,
    private readonly areaRegistry: AreaRegistry,
    private readonly areaReactionService: AreaReactionService,
  ) {}

  @Post()
  @ApiExcludeEndpoint()
  create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesManager.create(createServiceDto);
  }

  @Put()
  @ApiExcludeEndpoint()
  updateToken(
    @Param('token') token: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UpdateResult> {
    return this.servicesManager.updateToken(token, id);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({
    status: 200,
    description: 'List of services retrieved successfully.',
  })
  @ApiResponse({ type: [Service] })
  async getAllServices() {
    return await this.servicesManager.findAll();
  }

  @Get('connected')
  @ApiOperation({ summary: 'Get all services connected to the user' })
  @ApiResponse({
    status: 200,
    description: 'List of services retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ type: [Service] })
  getConnectedServices(@Req() request) {
    const userId = request.user.userId;
    return this.serviceTokenService.getAllConnectedServices(parseInt(userId));
  }

  @Get(':param')
  @Public()
  @ApiOperation({ summary: 'Get information about a service by id or by name' })
  @ApiResponse({
    status: 200,
    description: 'Information retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ type: Service })
  async getServiceById(@Param('param') param: string) {
    if (!isNaN(Number(param))) {
      const id = Number(param);
      return await this.servicesManager.findOne(id);
    } else {
      return await this.servicesManager.findByName(param);
    }
  }

  @Get(':id/elements')
  @Public()
  @ApiOperation({ summary: 'Get elements associated with the service' })
  @ApiResponse({
    status: 200,
    description: 'List of elements retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ type: [Element] })
  async getElementInServiceById(@Param('id', ParseIntPipe) id: number) {
    const actionsP = this.elementService.findActionsInServiceById(id);
    const reactionsP = this.elementService.findReactionsInServiceById(id);

    const [actions, reactions] = await Promise.all([actionsP, reactionsP]);
    return { actions: actions, reactions: reactions };
  }

  @Get(':id/actions')
  @Public()
  @ApiOperation({ summary: 'Get actions associated with the service' })
  @ApiResponse({
    status: 200,
    description: 'List of actions retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ type: [Element] })
  async getActionsInServiceById(@Param('id', ParseIntPipe) id: number) {
    return await this.elementService.findActionsInServiceById(id);
  }

  @Get(':id/reactions')
  @Public()
  @ApiOperation({ summary: 'Get reactions associated with the service' })
  @ApiResponse({
    status: 200,
    description: 'List of reactions retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ type: [Element] })
  async getReactionsInServiceById(@Param('id', ParseIntPipe) id: number) {
    return await this.elementService.findReactionsInServiceById(id);
  }

  @Get(':id/status')
  @ApiOperation({ summary: 'Know if the user is connected to the service' })
  @ApiResponse({ status: 200, description: 'Response retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  @ApiResponse({ type: Status })
  async getStatusServiceById(
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
  ) {
    const userId = request.user.userId;
    const status = await this.serviceTokenService.isConnected(userId, id);
    return { status: status };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Disconnect user from service' })
  @ApiResponse({ status: 200, description: 'Resource deleted successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ status: 404, description: 'Resource not found' })
  async disconnectToService(
    @Param('id', ParseIntPipe) id: number,
    @Req() request,
  ) {
    const areas = await this.areaService.findAllByUser(request.user.id);
    for (const area of areas) {
      if (area.action.service.id == id) {
        await this.areaReactionService.removeByAction(area.id);
        await this.areaService.remove(area.id);
        await this.areaRegistry.unregisterElement(area.id);
        continue;
      }
      for (const reaction of area.areaReaction) {
        if (reaction.element.service.id == id) {
          await this.areaReactionService.removeByAction(area.id);
          await this.areaService.remove(area.id);
          await this.areaRegistry.unregisterElement(area.id);
        }
      }
    }
    return await this.serviceTokenService.disconnectServiceById(
      request.user.id,
      id,
    );
  }
}
