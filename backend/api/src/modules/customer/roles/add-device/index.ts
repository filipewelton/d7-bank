import { Request, Response } from 'express'

import { validateDto } from '@shared/helpers/dto-validation'
import { identifyStatusCode } from '@shared/helpers/status-code'

import { DeviceService } from '@customer/services/device'

import { DeviceAddition } from './dto'

const service = new DeviceService()

export async function addDevice(req: Request, res: Response) {
  try {
    const body: DeviceAddition = req.body

    await validateDto(DeviceAddition, body)

    const { userId: customerId, deviceKey, name, platform } = body

    await service.create({ customerId, deviceKey, name, platform })

    res.status(201).json({
      message: 'Added device'
    })
  } catch (error) {
    error.context = 'Device addition'
    const code = identifyStatusCode(error.name)
    res.status(code).json({ error })
  }
}
