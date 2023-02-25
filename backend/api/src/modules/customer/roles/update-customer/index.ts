import { Request, Response } from 'express'

import { identifyStatusCode } from '@shared/helpers/status-code'
import { validateDto } from '@shared/helpers/dto-validation'

import { CustomerService } from '@customer/services/customer'

import { CustomerUpdate } from './dto'

const service = new CustomerService()

export async function updateCustomer(req: Request, res: Response) {
  try {
    const body: CustomerUpdate = req.body

    await validateDto(CustomerUpdate, body)

    const { userId, email, phoneNumber } = body

    await service.update(userId, { email, phoneNumber })

    res.status(200).json({
      message: 'Customer updated',
    })
  } catch (error) {
    error.context = 'Customer update'
    const code = identifyStatusCode(error.name)
    res.status(code).json({ error })
  }
}
