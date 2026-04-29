export interface IGetBankAgentsByCustomers {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  totalBankAgent: number;
  totalAmount: number;
  firstBankAgentDate: string;
  lastBankAgentDate: string;
}
