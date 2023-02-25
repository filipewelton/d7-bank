import { Request, Response } from 'express'

import { IdentifierService } from '@customer/services/identifier'

import { identifyStatusCode } from '@shared/helpers/status-code'
import { validateDto } from '@shared/helpers/dto-validation'

import { GettingDocument } from './dto'

const service = new IdentifierService()

export async function getDocuments(req: Request, res: Response) {
  try {
    const body: GettingDocument = {
      userId: String(req.query['user-id'])
    }

    await validateDto(GettingDocument, body)

    const { userId } = body
    const documents = await service.get(userId)

    res.status(200).json({ documents })
  } catch (error) {
    error.context = 'Document viewing'
    const code = identifyStatusCode(error.name)
    res.status(code).json({ error })
  }
}
