import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Google', description: 'The name of the service' })
  name: string;

  @ApiProperty({
    example: 'Use Gmail and GoogleCalendar',
    description: 'The description of the service',
  })
  description: string;

  @ApiProperty({ example: 'A definir', description: 'A definir' })
  front_data: string;

  @ApiProperty({ example: 'A definir', description: 'A definir' })
  need_token: boolean;

  @ApiProperty({
    example: 'Voir si on utilise',
    description: 'Voir si on utilise',
  })
  key_url: string;
}

export class Status {
  @ApiProperty({ example: true, description: 'Object is actif' })
  status: boolean;
}
