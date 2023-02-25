import {
  IsDateString,
  IsDecimal,
  IsEmail,
  IsHash,
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  Matches,
  MaxLength,
} from 'class-validator'

import { ValidateNestedObject } from '@shared/decorators/nested-object-validation'
import { ValidateNestedObjectMultiDTO } from '@shared/decorators/multi-dto-validation'

export class Address {
  @MaxLength(60)
  @IsNotEmpty()
  country: string

  @MaxLength(60)
  @IsNotEmpty()
  province: string

  @MaxLength(60)
  @IsNotEmpty()
  city: string

  @IsPostalCode('any')
  @IsNotEmpty()
  zipCode: string

  @MaxLength(100)
  @IsNotEmpty()
  street: string

  @MaxLength(20)
  @IsNotEmpty()
  district: string

  @IsDecimal()
  @IsOptional()
  number: string

  @MaxLength(10)
  @IsOptional()
  complement?: string
}

class NativeIdentifier {
  @Matches(/^\d{2,3}[.]\d{3}[.]\d{3}[-]\d{2}$/)
  @IsNotEmpty()
  cpf: string

  @Matches(/(^\d{1,2}.\d{3}.\d{3}-(\d{1}|X|x)$)/)
  @IsNotEmpty()
  rg: string
}

class ForeignIdentifier {
  @Matches(/(^\w{1}\d{6}-\d{1}$)/)
  @IsNotEmpty()
  rne: string
}

class Identifier {
  @MaxLength(60)
  @IsNotEmpty()
  birthplace: string

  @ValidateNestedObjectMultiDTO(NativeIdentifier, ForeignIdentifier)
  @IsNotEmpty()
  identifier: NativeIdentifier | ForeignIdentifier
}

export class Device {
  @MaxLength(10)
  @IsNotEmpty()
  platform: string

  @MaxLength(10)
  @IsNotEmpty()
  name: string

  @IsHash('md5')
  @IsNotEmpty()
  deviceKey: string
}

export class CustomerCreation {
  @MaxLength(100)
  @IsNotEmpty()
  name: string

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: string

  @Matches(/(Male|Female)/)
  @IsNotEmpty()
  genre: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @MaxLength(21)
  @IsNotEmpty()
  phoneNumber: string

  @ValidateNestedObject(Address)
  @IsNotEmpty()
  address: Address

  @ValidateNestedObject(Identifier)
  @IsNotEmpty()
  identifier: Identifier

  @ValidateNestedObject(Device)
  @IsNotEmpty()
  device: Device
}
