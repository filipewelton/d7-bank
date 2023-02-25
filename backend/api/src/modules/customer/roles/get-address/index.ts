import { Request, Response } from 'express'

import { AddressService } from '@customer/services/address'

import { validateDto } from '@shared/helpers/dto-validation'
import { identifyStatusCode } from '@shared/helpers/status-code'

import { GettingAddress } from './dto'

const service = new AddressService()

export async function getAddress(req: Request, res: Response) {
  try {
    const body: GettingAddress = {
      userId: String(req.query['user-id'])
    }

    await validateDto(GettingAddress, body)

    const { userId } = body
    const address = await service.get(userId)

    res.status(200).json({ address })
  } catch (error) {
    error.context = 'Recover address'
    const code = identifyStatusCode(error.name)
    res.status(code).json({ error })
  }
}
