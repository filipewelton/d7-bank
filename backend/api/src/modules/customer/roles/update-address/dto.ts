import { IsDecimal, IsNotEmpty, IsOptional, IsPostalCode, IsUUID, MaxLength } from 'class-validator'

export class AddressUpdate {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @MaxLength(60)
  @IsOptional()
  country?: string

  @MaxLength(60)
  @IsOptional()
  province?: string

  @MaxLength(60)
  @IsOptional()
  city?: string

  @IsPostalCode('any')
  @IsOptional()
  zipCode?: string

  @MaxLength(100)
  @IsOptional()
  street?: string

  @MaxLength(20)
  @IsOptional()
  district?: string

  @IsDecimal()
  @IsOptional()
  number?: string

  @MaxLength(10)
  @IsOptional()
  complement?: string
}
