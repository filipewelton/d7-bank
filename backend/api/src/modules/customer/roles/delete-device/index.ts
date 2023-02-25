import { Request, Response } from 'express'

import { validateDto } from '@shared/helpers/dto-validation'
import { identifyStatusCode } from '@shared/helpers/status-code'

import { DeviceService } from '@customer/services/device'

import { DeviceDeletion } from './dto'

const service = new DeviceService()

export async function deleteDevice(req: Request, res: Response) {
  try {
    const payload: DeviceDeletion = req.body

    await validateDto(DeviceDeletion, payload)

    const { userId, deviceKey } = payload

    await service.exclude(userId, deviceKey)

    res.status(200).json({
      message: 'Device deleted'
    })
  } catch (error) {
    error.context = 'Device deletion'
    const code = identifyStatusCode(error.name)
    res.status(code).json({ error })
  }
}