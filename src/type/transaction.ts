export type TransactionCategory = 
  | 'Dívidas'
  | 'Cartão de Crédito'
  | 'Empréstimos'
  | 'Financiamentos'
  | 'Investimentos'
  | 'Poupança'
  | 'Renda Fixa'
  | 'Restaurantes'
  | 'Mercado'
  | 'Saúde'
  | 'Educação'
  | 'Serviços'
  | 'Moradia'
  | 'Vestuário'
  | 'Assinaturas'
  | 'Utilidades'
  | 'Presentes'
  | 'Outros'
  | 'Transporte'
  | 'Lazer'

export const transactionTypes = ['Despesa Fixa', 'Despesa Variável', 'Receita Fixa', 'Receita Variável', 'Parcelamento']
export const transactionCategories: TransactionCategory[] = [
  'Dívidas',
  'Cartão de Crédito',
  'Empréstimos',
  'Financiamentos',
  'Investimentos',
  'Poupança',
  'Renda Fixa',
  'Restaurantes',
  'Mercado',
  'Saúde',
  'Educação',
  'Serviços',
  'Moradia',
  'Vestuário',
  'Assinaturas',
  'Utilidades',
  'Presentes',
  'Outros',
  'Transporte',
  'Lazer'
]

export type Transaction = {
  transactionId: string
  title: string
  createdAt: Date | string
  value: number
  category: TransactionCategory
  type: string
}