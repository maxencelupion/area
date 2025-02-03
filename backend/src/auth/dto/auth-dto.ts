import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: 'nathan@test.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'nathan@test.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  password: string;

  @ApiProperty({ example: 'Nathan', description: 'The surname of the user' })
  surname: string;

  @ApiProperty({ example: 'Baudelin', description: 'The lastname of the user' })
  lastname: string;

  @ApiProperty({ example: 'en', description: 'The language of the user' })
  language: string;
}

export class Token {
  @ApiProperty({description: 'The connexion token' })
  access_token: string;
}
