import { Database } from '@infrastructure/database'
import { CustomError } from '@shared/helpers/custom-error'

export class DeviceService {
  private readonly ERROR_CONTEXT = 'Device creation'
  private client = Database.client

  public async create(data: DeviceCreation) {
    return await this.client.device
      .create({ data })
      .then(({ id }) => id)
      .catch((reason) => {
        const error = new CustomError('ExternalServiceError', this.ERROR_CONTEXT, reason)
        return Promise.reject(error)
      })
  }

  public async get(userId: string) {
    try {
      return await this.client.device.findMany({
        where: { customerId: userId },
      })
    } catch (reason) {
      const error = new CustomError('ExternalServiceError', 'Getting devices', reason)
      return Promise.reject(error)
    }
  }

  public async exclude(userId: string, deviceKey: string) {
    const devices = await this.get(userId)
    const { id } = devices.filter((d) => d.deviceKey === deviceKey)[0]

    try {
      await this.client.device.delete({ where: { id } })
      return Promise.resolve()
    } catch (reason) {
      const error = new CustomError('ExternalServiceError', 'Device deletion', reason)
      return Promise.reject(error)
    }
  }
}
