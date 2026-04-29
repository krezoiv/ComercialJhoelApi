export interface IGetCustomerStats {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;

  totalExpenses: number;
  totalExpensesAmount: number;

  totalBankAgent: number;
  totalBankAgentAmount: number;

  firstExpenseDate: string;
  lastExpenseDate: string;
  firstPaymentDate: string;
  lastPaymentDate: string;
}
