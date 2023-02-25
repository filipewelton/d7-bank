import { Request, Response } from 'express'

import { identifyStatusCode } from '@shared/helpers/status-code'
import { validateDto } from '@shared/helpers/dto-validation'

import { AddressService } from '@customer/services/address'

import { AddressUpdate } from './dto'

const service = new AddressService()

export async function updateAddress(req: Request, res: Response) {
  try {
    const body: AddressUpdate = req.body

    await validateDto(AddressUpdate, body)

    const { userId } = body
    const data = body

    delete data.userId

    await service.update(userId, data)

    res.status(200).json({
      message: 'Address updated successfully'
    })
  } catch (error) {
    error.context = 'Address update'
    const code = identifyStatusCode(error.name)
    console.log(error, req.body)
    res.status(code).json({ error })
  }
}