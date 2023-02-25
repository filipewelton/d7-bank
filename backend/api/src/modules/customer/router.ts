import { Router } from 'express'

import { createCustomer } from './roles/create-customer'
import { updateCustomer } from './roles/update-customer'
import { getAddress } from './roles/get-address'
import { updateAddress } from './roles/update-address'
import { getDocuments } from './roles/get-documents'
import { addDevice } from './roles/add-device'
import { getDevices } from './roles/get-devices'
import { deleteDevice } from './roles/delete-device'

const router = Router({
  caseSensitive: true,
})

router.post('/create', createCustomer)
router.patch('/update', updateCustomer)

router.get('/address/get', getAddress)
router.patch('/address/update', updateAddress)

router.get('/documents/get', getDocuments)

router.post('/device/add', addDevice)
router.get('/device/get', getDevices)
router.delete('/device/delete', deleteDevice)

export default router
