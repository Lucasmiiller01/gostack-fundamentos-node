import { Router } from 'express';

import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

const createTransactionService = new CreateTransactionService(transactionsRepository);

transactionRouter.get('/', (request, response) => {
  try {

    const transactions = transactionsRepository.all();

    return response.status(200).json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    try {
      const transaction = createTransactionService.execute({ title, value, type });
      return response.status(200).json(transaction);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
