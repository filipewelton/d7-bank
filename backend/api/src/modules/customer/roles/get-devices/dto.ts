import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeviceRecover {
  @IsUUID()
  @IsNotEmpty()
  userId: string
}
