import { IsHash, IsNotEmpty, IsUUID } from 'class-validator'

export class DeviceDeletion {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsHash('md5')
  @IsNotEmpty()
  deviceKey: string
}
