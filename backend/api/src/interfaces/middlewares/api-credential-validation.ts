import { NextFunction, Request, Response } from 'express'

import { ApiCredential } from '@shared/dto/api-credential'
import { validateDto } from '@shared/helpers/dto-validation'
import { ApiCredentialService } from '@shared/services/api-credential'
import { identifyStatusCode } from '@shared/helpers/status-code'

export async function validateApiCredential(req: Request, res: Response, next: NextFunction) {
  try {
    const credential: ApiCredential = {
      key: String(req.headers['api-key']),
      token: String(req.headers['api-token']),
    }

    await validateDto(ApiCredential, credential)

    const { key, token } = credential
    const service = new ApiCredentialService()
    const storedToken = await service.get(key)

    service.validate(token, storedToken)

    next()
  } catch (error) {
    error.context = 'API credential validation'
    const code = identifyStatusCode(error.name)
    res.status(code).json({ error })
  }
}
