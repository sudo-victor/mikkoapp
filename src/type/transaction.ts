export const transactionTypes = ['Despesa Fixa', 'Despesa Variável', 'Receita Fixa', 'Receita Variável', 'Parcelamento']
export const transactionCategories = ['Dívidas', 'Cartão de Crédito', 'Empréstimos', 'Financiamentos', 'Investimentos', 'Poupança', 'Renda Fixa']

export type Transaction = {
  id: string
  title: string
  createdAt: Date | string
  value: number
  category: string
  type: string
}