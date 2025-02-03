import { Injectable } from '@nestjs/common';
import { ServiceManager } from '../service-manager.service';
import { BaseService } from './base-service.service';

@Injectable()
export class ServiceRegistry {
  constructor(private serviceManager: ServiceManager) {}
  private services = new Map<number, BaseService>();

  async registerService(service: BaseService) {
    const tmp = await service.initInDb(this.serviceManager);
    if (!tmp) {
      return false;
    }
    this.services.set(tmp.id, service);
    return true;
  }

  getElement(id: number): BaseService | undefined {
    return this.services.get(id);
  }

  unregisterElement(id: number) {
    this.services.delete(id);
  }
}
