import express from 'express';
const router = express.Router();
import validateToken from '../middleware/validateTokenHandler.js';

import {
  getList,
  createItem,
  getItem,
  updateItem,
  updateItemCompletion,
  deleteItem,
} from '../controllers/todoControllers.js';

router.route('/').get(validateToken, getList).post(validateToken, createItem);
router
  .route('/:id')
  .get(validateToken, getItem)
  .put(validateToken, updateItem)
  .delete(validateToken, deleteItem);
router.put('/:id/update-completion', validateToken, updateItemCompletion);

export default router;
