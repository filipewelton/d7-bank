import { Request, Response, NextFunction } from 'express'

import { UserCredential } from '@shared/dto/user-credential'
import { validateDto } from '@shared/helpers/dto-validation'
import { identifyStatusCode } from '@shared/helpers/status-code'
import { UserCredentialService } from '@shared/services/user-credential'

export async function validateUserCredential(req: Request, res: Response, next: NextFunction) {
  try {
    const body: UserCredential = req.body

    await validateDto(UserCredential, body)

    const service = new UserCredentialService()
    const { userCredential } = body
    const { deviceKey } = userCredential
    const storedCredential = await service.get(deviceKey)

    await service.validate(userCredential, storedCredential)

    next()
  } catch (error) {
    error.context = 'User credential validation'
    const code = identifyStatusCode(error.name)
    res.status(code).json({ error })
  }
}
