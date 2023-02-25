import { Database } from '@infrastructure/database'

import { CustomError } from '@shared/helpers/custom-error'

export class IdentifierService {
  private readonly ERROR_CONTEXT = 'Identifier creation'
  private client = Database.client

  public async create(data: IdentifierCreation) {
    try {
      const { identifier } = data
      const birthplace = data.birthplace.toLowerCase()

      if (birthplace === 'brazil') {
        const nid = await this.client.nativeIdentifier.create({
          data: {
            cpf: identifier['cpf'],
            rg: identifier['rg'],
          },
        })
        const iid = await this.client.identifier.create({
          data: {
            birthplace,
            nativeIdentifierId: nid.id,
          },
        })

        return Promise.resolve(iid.id)
      }

      const fid = await this.client.foreignIdentifier.create({
        data: {
          rne: identifier['rne'],
        },
      })
      const iid = await this.client.identifier.create({
        data: {
          birthplace,
          foreignIdentifierId: fid.id,
        },
      })

      return Promise.resolve(iid.id)
    } catch (reason) {
      const error = new CustomError('ExternalServiceError', this.ERROR_CONTEXT, reason)
      console.log(error)
      return Promise.reject(error)
    }
  }

  private async getIdentifierId(userId: string) {
    const user = await this.client.customer.findFirstOrThrow({ where: { id: userId } })
    return user.identifierId
  }

  public async get(userId: string) {
    try {
      const id = await this.getIdentifierId(userId)
      const identifier = await this.client.identifier.findFirstOrThrow({ where: { id } })
      return identifier
    } catch (reason) {
      const error = new CustomError('ExternalServiceError', 'Getting identifier', reason)
      return Promise.reject(error)
    }
  }
}
