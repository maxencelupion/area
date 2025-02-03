export class CreateServiceTokenDto {
  key: string;
  refresh_key: string;
  time_received: number;
  time_expire: number;
  userId: number;
  serviceId: number;
}
