import { 
  CreditCard, 
  Wallet, 
  PiggyBank, 
  Building2, 
  TrendingUp, 
  Landmark,
  BadgeDollarSign,
  Utensils,
  ShoppingCart,
  Heart,
  GraduationCap,
  WrenchIcon,
  Home,
  Shirt,
  Lightbulb,
  Gift,
  PencilLine,
  HelpCircle,
  Car,
  Ticket,
  LucideProps
} from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

import { TransactionCategory } from '@/type/transaction'

const IconMapper: Record<TransactionCategory,  ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>> = {
  'Dívidas': Wallet,
  'Cartão de Crédito': CreditCard,
  'Empréstimos': BadgeDollarSign,
  'Financiamentos': Building2,
  'Investimentos': TrendingUp,
  'Poupança': PiggyBank,
  'Renda Fixa': Landmark,
  'Restaurantes': Utensils,
  'Mercado': ShoppingCart,
  'Saúde': Heart,
  'Educação': GraduationCap,
  'Serviços': WrenchIcon,
  'Moradia': Home,
  'Vestuário': Shirt,
  'Assinaturas': PencilLine,
  'Utilidades': Lightbulb,
  'Presentes': Gift,
  'Outros': HelpCircle,
  'Transporte': Car,
  'Lazer': Ticket
}

export const TransactionIcon = ({ category }: { category: TransactionCategory }) => {
  const Icon = IconMapper[category]
  return Icon ? <Icon size={20} color="#131210" /> : null
}