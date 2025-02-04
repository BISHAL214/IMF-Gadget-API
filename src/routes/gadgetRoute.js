import express from 'express';
import { getAllGadgets, addGadget, updateGadget, deleteGadget, selfDestruct } from '../controllers/gadgetController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);
router.get('/', getAllGadgets);
router.post('/', addGadget);
router.patch('/:id', updateGadget);
router.delete('/:id', deleteGadget);
router.post('/:id/self-destruct', selfDestruct);

export default router;