import { Request, Response } from 'express'

import { identifyStatusCode } from '@shared/helpers/status-code'
import { validateDto } from '@shared/helpers/dto-validation'

import { DeviceService } from '@customer/services/device'

import { DeviceRecover } from './dto'

const service = new DeviceService()

export async function getDevices(req: Request, res: Response) {
  try {
    const body: DeviceRecover = {
      userId: String(req.query['user-id']),
    }

    await validateDto(DeviceRecover, body)

    const { userId } = body
    const devices = await service.get(userId)

    res.status(200).json({ devices })
  } catch (error) {
    error.context = 'Getting devices'
    const code = identifyStatusCode(error.name)
    res.status(code).json({ error })
  }
}
