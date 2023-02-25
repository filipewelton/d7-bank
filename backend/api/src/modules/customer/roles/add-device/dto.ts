import { IsNotEmpty, IsUUID } from 'class-validator'

import { Device as Dto } from '../create-customer/dto'

export class DeviceAddition extends Dto {
  @IsUUID()
  @IsNotEmpty()
  userId: string
}
