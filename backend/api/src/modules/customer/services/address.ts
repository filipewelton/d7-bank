import { Database } from '@infrastructure/database'

import { CustomError } from '@shared/helpers/custom-error'

export class AddressService {
  private client = Database.client

  public async create(data: AddressCreation) {
    return await this.client.address
      .create({ data })
      .then(({ id }) => id)
      .catch((reason) => {
        const error = new CustomError('ExternalServiceError', 'Address creation', reason)
        return Promise.reject(error)
      })
  }

  private async getAddressId(userId: string) {
    const user = await this.client.customer.findFirstOrThrow({ where: { id: userId } })
    return user.addressId
  }

  public async get(userId: string) {
    try {
      const id = await this.getAddressId(userId)
      const address = await this.client.address.findFirstOrThrow({
        where: { id },
      })
      return address
    } catch (reason) {
      const error = new CustomError('ExternalServiceError', 'Getting address', reason)
      return Promise.reject(error)
    }
  }

  public async update(userId: string, data: AddressUpdate) {
    try {
      const id = await this.getAddressId(userId)
      await this.client.address.update({ where: { id }, data })
      return Promise.resolve()
    } catch (reason) {
      const error = new CustomError('ExternalServiceError', 'Address update', reason)
      return Promise.reject(error)
    }
  }
}
