import { Database } from '@infrastructure/database'

import { CustomError } from '@shared/helpers/custom-error'

export class CustomerService {
  private readonly ERROR_CONTEXT = 'Customer creation service'
  private client = Database.client

  public async create(data: CustomerCreation) {
    try {
      const parsedData: CustomerCreation = {
        ...data,
        phoneNumber: data.phoneNumber.replace(/\s|\W/g, ''),
      }
      const customer = await this.client.customer.create({ data: parsedData })
      return customer.id
    } catch (reason) {
      const error = new CustomError('ExternalServiceError', this.ERROR_CONTEXT, reason)
      return Promise.reject(error)
    }
  }

  public async update(id: string, data: CustomerUpdate) {
    try {
      await this.client.customer.update({
        where: { id },
        data,
      })
      return Promise.resolve()
    } catch (reason) {
      console.log(reason)
      const error = new CustomError('ExternalServiceError', this.ERROR_CONTEXT, reason)
      return Promise.reject(error)
    }
  }
}
