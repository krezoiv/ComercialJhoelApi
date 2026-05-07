export interface IBankAgentCustomersIdResponseDto {
  id: string;
  customerId: string;
  bankId: string;
  userId: string;
  userName: string;
  description: string;
  amount: number;
  paymentDate: string;
  createdAt: Date;
  updatedAt: Date | null;

  // 🔥 extras del SP
  bankName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
