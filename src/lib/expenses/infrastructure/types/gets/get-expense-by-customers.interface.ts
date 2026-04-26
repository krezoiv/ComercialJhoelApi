export interface IGetExpensesByCustomers {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  totalExpenses: number;
  totalAmount: number;
  firstExpenseDate: string;
  lastExpenseDate: string;
}
