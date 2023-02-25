import { IsNotEmpty, IsUUID } from 'class-validator'

export class GettingAddress {
  @IsUUID()
  @IsNotEmpty()
  userId: string
}
