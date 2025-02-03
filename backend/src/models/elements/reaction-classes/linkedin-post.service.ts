import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ServiceTokenService } from '../../servicesTokens/serviceToken.service';
import { BaseReaction } from './base-reaction.service';
import { ReactionRegistry } from './reaction-registry.service';
import { Event } from '../event';

@Injectable()
export class LinkedInPostService extends BaseReaction {
  constructor(
    serviceId: number,
    private httpService: HttpService,
    private serviceTokenService: ServiceTokenService,
    private reactionRegistry: ReactionRegistry,
  ) {
    super(
      'LinkedIn: create a Post',
      'you create a new LinkedIn Post',
      'reaction',
      serviceId,
      'https://api.linkedin.com/v2/ugcPosts',
    );
  }

  async registerElement() {
    await this.reactionRegistry.registerElement(this);
  }

  getServiceId() {
    return this.serviceId;
  }

  async execReaction(userId: number, parameters: Event) {
    const access_token = await this.serviceTokenService.findOneAction({
      where: {
        user: { id: userId },
        service: { id: this.serviceId },
      },
    });
    if (!access_token) {
      throw UnauthorizedException;
    }

    const headersGet = {
      Authorization: `Bearer ${access_token.key}`,
      'Content-Type': 'application/json',
    };

    const headersPost = {
      Authorization: `Bearer ${access_token.key} `,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    };

    try {
      const responseProfile = await this.httpService.axiosRef.get(
        'https://api.linkedin.com/v2/userinfo',
        {
          headers: headersGet,
        },
      );
      const { sub } = responseProfile.data;

      const bodyText: string = parameters.body ? parameters.body : 'Test Post!';
      const title: string = parameters.body ? parameters.body : 'Test title';

      const payload = {
        author: `urn:li:person:${sub}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              title: title,
              text: bodyText,
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'CONNECTIONS',
        },
      };

      const responsePost = await this.httpService.axiosRef.post(
        this.url,
        payload,
        {
          headers: headersPost,
        },
      );
      console.log({ responsePost: responsePost.data });
      const { id } = responsePost.data;
      return {
        id: id,
        title: parameters.title,
        body: parameters.body,
        sender: parameters.sender,
        date: new Date(),
      };
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
