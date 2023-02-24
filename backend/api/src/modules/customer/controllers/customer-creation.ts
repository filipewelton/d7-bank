import { Request, Response } from 'express'

import { CustomerService } from '@customer/services/customer'
import { AddressService } from '@customer/services/address'
import { DeviceCreation, DeviceService } from '@customer/services/device'
import { CustomerCreation } from '@customer/dto/customer-creation'
import { IdentifierService } from '@customer/services/identifier'

import { CustomError } from '@shared/helpers/custom-error'
import { validateDto } from '@shared/helpers/dto-validation'
import { identifyStatusCode } from '@shared/helpers/status-code'

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
  } catch ({ name, reason }) {
    const error = new CustomError(name, 'User creation', reason)
    const code = identifyStatusCode(error.name)
    console.log(error)
    res.status(code).json({ error })
  }
}
