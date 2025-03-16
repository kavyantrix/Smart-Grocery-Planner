import express from 'express'
import { vendorController } from '../controllers/vendorController'
import { authenticateUser } from '../middleware/auth'

const router = express.Router()

router.use(authenticateUser)

router.post('/compare', vendorController.compareProducts)
router.post('/schedule-order', vendorController.scheduleOrder)
router.get('/alternatives/:productId', vendorController.getAlternatives)
router.get('/:vendorId/offers', vendorController.getVendorOffers)

export default router