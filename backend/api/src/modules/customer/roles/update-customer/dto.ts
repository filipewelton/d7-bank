import { IsEmail, IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator'

export class CustomerUpdate {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsEmail()
  @IsOptional()
  email?: string

  @MaxLength(21)
  @IsOptional()
  phoneNumber?: string
}
