import { ApiProperty } from '@nestjs/swagger';

export class CreateAreaDto {
  @ApiProperty({ example: 'Area1', description: 'The name of the area' })
  name: string;

  @ApiProperty({
    example: 'Change my profile picture when I post a picture',
    description: 'The description of the area',
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'The id of the linked action (element)',
  })
  actionId: number;

  @ApiProperty({ example: {}, description: 'The parameter of the action' })
  parameter: any;

  @ApiProperty({ example: true, description: 'active the area (true/false)' })
  active: boolean;

  last_executed: Date;
  userId: number;
  color: string;
}

export class ReactionDto {
  @ApiProperty({
    example: {},
    description: 'The parameter of the area_reaction',
  })
  parameter_reaction: any;

  @ApiProperty({ example: 1, description: 'The order of execution' })
  order: number;

  @ApiProperty({
    example: 2,
    description: 'The id of the linked reaction(element)',
  })
  elementId: number;
}

export class AreaDto {
  @ApiProperty({ example: 'Area1', description: 'The name of the area' })
  name: string;

  @ApiProperty({
    example: 'Change my profile picture when I post a picture',
    description: 'The description of the area',
  })
  description: string;

  @ApiProperty({ example: {}, description: 'The parameter of the area_action' })
  parameter: any;

  @ApiProperty({ example: true, description: 'active the area (true/false)' })
  active: boolean;

  @ApiProperty({
    example: 3,
    description: 'The id of the linked action(element)',
  })
  actionId: number;

  @ApiProperty({
    type: [ReactionDto],
    description: 'The reactions linked to this action',
  })
  reactions: [ReactionDto];

  @ApiProperty({ example: '#FFFFFF', description: 'color of the card (front)' })
  color: string;
}

export class ActionDto {
  @ApiProperty({ example: 'Action1', description: 'The name of the action' })
  name: string;

  @ApiProperty({
    example: 'Change my profile picture when I post a picture',
    description: 'The description of the action',
  })
  description: string;

  @ApiProperty({
    example: 'action',
    description: 'The type of the element (action/reaction)',
  })
  type: string;

  @ApiProperty({
    example: 1,
    description: 'The id of the linked service',
  })
  serviceId: number;

  @ApiProperty({
    example: 'https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages',
    description: 'The url of the element',
  })
  url: string;
}

export class Action {
  @ApiProperty({ example: 1, description: 'The id of the action' })
  id: number;

  @ApiProperty({ example: 'Action1', description: 'The name of the action' })
  name: string;

  @ApiProperty({
    example: 'Change my profile picture when I post a picture',
    description: 'The description of the action',
  })
  description: string;

  @ApiProperty({
    example: 'action',
    description: 'The type of the element (action/reaction)',
  })
  type: string;

  @ApiProperty({
    example: 1,
    description: 'The id of the linked service',
  })
  serviceId: number;

  @ApiProperty({
    example: 'https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages',
    description: 'The url of the element',
  })
  url: string;
}

export class Reaction {
  @ApiProperty({ example: 1, description: 'The id of the area_reaction' })
  id: number;

  @ApiProperty({
    example: {},
    description: 'The parameter of the area_reaction',
  })
  parameter_reaction: any;

  @ApiProperty({ example: 1, description: 'The order of execution' })
  order: number;

  @ApiProperty({
    example: 2,
    description: 'The id of the linked reaction(element)',
  })
  elementId: number;
}

export class Area {
  @ApiProperty({ example: 1, description: 'The id of the area' })
  id: number;

  @ApiProperty({ example: 'Area1', description: 'The name of the area' })
  name: string;

  @ApiProperty({
    example: 'Change my profile picture when I post a picture',
    description: 'The description of the area',
  })
  description: string;

  @ApiProperty({ example: {}, description: 'The parameter of the action' })
  parameter: any;

  @ApiProperty({ example: true, description: 'active the area (true/false)' })
  active: boolean;

  @ApiProperty({
    type: Number,
    description: 'The linked action (element)',
  })
  actionId: number;

  @ApiProperty({
    type: [Reaction],
    description: 'The reactions linked to this action',
  })
  reactions: [Reaction];

  @ApiProperty({ example: '#FFFFFF', description: 'color of the card (front)' })
  color: string;
}
