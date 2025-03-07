import { Transaction } from "@/type/transaction";

export const transactionsMock: Transaction[] = [
  {
    id: "1",
    title: "Aluguel",
    createdAt: new Date("2023-01-01"),
    value: 1200,
    category: "Dívidas",
    type: "Despesa Fixa",
  },
  {
    id: "2",
    title: "Salário",
    createdAt: new Date("2023-01-05"),
    value: 3000,
    category: "Renda Fixa",
    type: "Receita Fixa",
  },
  {
    id: "3",
    title: "Conta de Luz",
    createdAt: new Date("2023-01-10"),
    value: 200,
    category: "Dívidas",
    type: "Despesa Variável",
  },
  {
    id: "4",
    title: "Investimento em Ações",
    createdAt: new Date("2023-01-15"),
    value: 500,
    category: "Investimentos",
    type: "Receita Variável",
  },
  {
    id: "5",
    title: "Compra de Supermercado",
    createdAt: new Date("2023-01-20"),
    value: 150,
    category: "Despesa Variável",
    type: "Despesa Variável",
  },
];