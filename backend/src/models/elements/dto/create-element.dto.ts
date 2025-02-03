import { ApiProperty } from '@nestjs/swagger';

export class CreateElementDto {
  @ApiProperty({
    example: 'Send an Email',
    description: 'The name of the element',
  })
  name: string;

  @ApiProperty({
    example: 'Send an Email with Gmail',
    description: 'The description of the element',
  })
  description: string;

  @ApiProperty({
    example: 'reaction',
    description: 'The type of the element (action/reaction)',
  })
  type: string;

  @ApiProperty({ example: 1, description: 'The id of the linked service' })
  serviceId: number;

  @ApiProperty({
    example: 'https://google/send_mail',
    description: 'The url needed to run the element',
  })
  url: string;

  @ApiProperty({
    example: 1,
    description: 'The id of the element',
  })
  elementId: number;
}
