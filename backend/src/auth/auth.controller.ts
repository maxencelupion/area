import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Public } from '../common/constants/metadata';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto, RegisterDto, Token } from './dto/auth-dto';
import { MsAuthGuard } from './guards/ms-auth.guard';
import { User } from 'src/models/users/entities/user.entity';
import { TwitchAuthGuard } from './guards/twitch-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { SpotifyAuthGuard } from './guards/spotify-auth.guard';
import { CreateUserDto } from 'src/models/users/dto/create-user.dto';
import { LinkedinAuthGuard } from './guards/linkedin-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  front_url = this.configService.get<string>('app.front_url');
  back_url = this.configService.get<string>('app.back_url');

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 200,
    description: 'The user has successfully logged in.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized: Invalid password' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: Token })
  async login(@Body() loginBody: LoginDto) {
    return await this.authService.login(loginBody);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request: registration failed' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ type: Token })
  async register(@Body() registerBody: RegisterDto) {
    return await this.authService.register(registerBody);
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  @Get('google/login')
  async googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const reqQueryState = req.query.state.toString().split('|');
    const dest_url: string = reqQueryState[0];
    const accessToken = req.cookies['access_token'] || reqQueryState[1];
    const jwtToken = this.jwtService.decode(accessToken);
    if (jwtToken) {
      req.user.email = jwtToken.email;
      await this.authService.registerServiceToken(req.user);
      res.redirect(`${dest_url}`);
      return res.status(HttpStatus.OK).send();
    }
    try {
      const user = await this.authService.getUserFromRequest(req, jwtToken);
      const token = await this.authService.signInService(user, req.user);
      await this.authService.registerServiceToken(req.user);
      res.redirect(`${dest_url}?access_token=${token.access_token}`);
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      console.log('ERROR IN GOOGLE CALLBACK: ', error);
      res.redirect(`${dest_url}?results=failed`);
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  @Public()
  @UseGuards(MsAuthGuard)
  @ApiExcludeEndpoint()
  @Get('microsoft/login')
  async microsoftLogin() {}

  @Public()
  @UseGuards(MsAuthGuard)
  @ApiExcludeEndpoint()
  @Get('microsoft/callback')
  async msAuthCallback(@Req() req, @Res() res: Response) {
    const reqQueryState = req.query.state.toString().split('|');
    const dest_url: string = reqQueryState[0];
    const accessToken = req.cookies['access_token'] || reqQueryState[1];
    const jwtToken = this.jwtService.decode(accessToken);
    if (jwtToken) {
      req.user.email = jwtToken.email;
      await this.authService.registerServiceToken(req.user);
      res.redirect(`${dest_url}`);
      return res.status(HttpStatus.OK).send();
    }
    try {
      const user = await this.authService.getUserFromRequest(req, jwtToken);
      const token = await this.authService.signInService(user, req.user);
      await this.authService.registerServiceToken(req.user);
      res.redirect(`${dest_url}?access_token=${token.access_token}`);
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      console.log('ERROR IN MICROSOFT CALLBACK: ', error);
      res.redirect(`${dest_url}?results=failed`);
      return res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  @Public()
  @UseGuards(TwitchAuthGuard)
  @ApiExcludeEndpoint()
  @Get('twitch/login')
  async twitchLogin() {}

  @Public()
  @UseGuards(TwitchAuthGuard)
  @ApiExcludeEndpoint()
  @Get('twitch/callback')
  async authTwitchCallback(@Req() req, @Res() res: Response) {
    const reqQueryState = req.query.state.toString().split('|');
    const dest_url: string = reqQueryState[0];
    const accessToken = req.cookies['access_token'] || reqQueryState[1];
    const jwtToken = this.jwtService.decode(accessToken);
    if (jwtToken) {
      req.user.email = jwtToken.email;
      await this.authService.registerServiceToken(req.user);
      res.redirect(`${dest_url}`);
      return res.status(HttpStatus.OK).send();
    }
  }

  @Public()
  @UseGuards(GithubAuthGuard)
  @ApiExcludeEndpoint()
  @Get('github/login')
  async githubLogin() {}

  @Public()
  @UseGuards(GithubAuthGuard)
  @ApiExcludeEndpoint()
  @Get('github/callback')
  async authGithubCallback(@Req() req, @Res() res: Response) {
    const reqQueryState = req.query.state.toString().split('|');
    const dest_url: string = reqQueryState[0];
    const accessToken = req.cookies['access_token'] || reqQueryState[1];
    const jwtToken = this.jwtService.decode(accessToken);
    if (jwtToken) {
      req.user.email = jwtToken.email;
      await this.authService.registerServiceToken(req.user);
      res.redirect(`${dest_url}`);
      return res.status(HttpStatus.OK).send();
    }
  }

  @Public()
  @UseGuards(SpotifyAuthGuard)
  @ApiExcludeEndpoint()
  @Get('spotify/login')
  async spotifyLogin() {}

  @Public()
  @UseGuards(SpotifyAuthGuard)
  @ApiExcludeEndpoint()
  @Get('spotify/callback')
  async authSpotifyCallback(@Req() req, @Res() res: Response) {
    const reqQueryState = req.query.state.toString().split('|');
    const dest_url: string = reqQueryState[0];
    const accessToken = req.cookies['access_token'] || reqQueryState[1];
    const jwtToken = this.jwtService.decode(accessToken);
    if (jwtToken) {
      req.user.email = jwtToken.email;
      await this.authService.registerServiceToken(req.user);
      res.redirect(`${dest_url}`);
      return res.status(HttpStatus.OK).send();
    }
  }

  @Public()
  @UseGuards(LinkedinAuthGuard)
  @Get('linkedin/login')
  async linkedinLogin() {
    return { message: 'LinkedIn auth route is accessible' };
  }

  @Public()
  @UseGuards(LinkedinAuthGuard)
  @ApiExcludeEndpoint()
  @Get('linkedin/callback')
  async authDropboxCallback(@Req() req, @Res() res: Response) {
    const reqQueryState = req.query.state.toString().split('|');
    const dest_url: string = reqQueryState[0];
    const accessToken = req.cookies['access_token'] || reqQueryState[1];
    const jwtToken = this.jwtService.decode(accessToken);
    if (jwtToken) {
      req.user.email = jwtToken.email;
      await this.authService.registerServiceToken(req.user);
      res.redirect(`${dest_url}`);
      return res.status(HttpStatus.OK).send();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get the user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiResponse({ type: User })
  async getProfile(@Req() request) {
    return await this.authService.getProfile(request.user);
  }

  @Put('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update the user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: authentication required',
  })
  @ApiBody({ type: RegisterDto })
  async updateProfile(@Body() body: CreateUserDto) {
    return await this.authService.updateProfile(body);
  }
}
