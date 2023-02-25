import { Request, Response } from 'express'

import { CustomerService } from '@customer/services/customer'
import { AddressService } from '@customer/services/address'
import { DeviceCreation, DeviceService } from '@customer/services/device'
import { IdentifierService } from '@customer/services/identifier'

import { validateDto } from '@shared/helpers/dto-validation'
import { identifyStatusCode } from '@shared/helpers/status-code'

import { CustomerCreation } from './dto'

export async function createCustomer(req: Request, res: Response) {
  try {
    const body: CustomerCreation = req.body

    await validateDto(CustomerCreation, body)

    const addressService = new AddressService()
    const identifierService = new IdentifierService()
    const customerService = new CustomerService()
    const deviceService = new DeviceService()
    const addressId = await addressService.create(body.address)
    const identifierId = await identifierService.create(body.identifier)
    const customerId = await customerService.create({
      addressId,
      identifierId,
      email: body.email,
      dateOfBirth: body.dateOfBirth,
      genre: body.genre,
      name: body.name,
      phoneNumber: body.phoneNumber
    })
    const deviceData: DeviceCreation = {
      customerId,
      ...body.device,
    }
   
    await deviceService.create(deviceData)

    res.status(201).json({
      message: 'Customer created successfully'
    })
  } catch (error) {
    error.context = 'User creation'
    const code = identifyStatusCode(error.name)
    res.status(code).json({ error })
  }
}
