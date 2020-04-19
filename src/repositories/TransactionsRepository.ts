import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initial: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = this.transactions.reduce((accumulator, transaction) => {
      switch (transaction.type) {
        case 'income':
          return {
            ...accumulator,
            income: transaction.value + accumulator.income,
            total: transaction.value + accumulator.income - accumulator.outcome,
          };
        case 'outcome':
          return {
            ...accumulator,
            outcome: transaction.value + accumulator.outcome,
            total: accumulator.income - transaction.value + accumulator.outcome,
          };

        default:
          return accumulator;
      }
    }, initial);

    return balance;
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
