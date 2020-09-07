import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ListAll {
  transactions: Transaction[];
  balance: Balance;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ListAll {
    return { transactions: this.transactions, balance: this.getBalance() };
  }

  public getBalance(): Balance {

    const totalOutcome = this.returnTotal("outcome");

    const totalIncome = this.returnTotal("income");

    return { outcome: totalOutcome, income: totalIncome, total: totalIncome - totalOutcome }
  }

  public create({ title, value, type }: Omit<Transaction, "id">): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }


  private returnTotal(type: string): number {
    return this.transactions.reduce((acc, elem) => {
      if (elem.type === type)
        return acc = acc + elem.value;
      return acc;

    }, 0);
  }
}

export default TransactionsRepository;
