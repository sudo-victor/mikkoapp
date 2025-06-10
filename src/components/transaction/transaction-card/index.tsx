import clsx from "clsx";

import { Transaction } from "@/type/transaction";
import { TransactionIcon } from "@/components/transaction/transaction-icon";
import { TransactionEditorDrawer } from "../transaction-editor-drawer";

type Props = {
  data: Transaction
  onTransactionUpdate?: (updatedTransaction: Transaction) => void
}

const formatCurrency = (value: number, movementType: string) => {
  const real = value / 100
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(real));

  return movementType === 'WITHDRAW' ? `-${formattedValue}` : `+${formattedValue}`;
};

export const TransactionCard = ({ data, onTransactionUpdate }: Props) => {

  return (
    <article className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <div className="shrink-0 w-7 h-7 flex items-center justify-center bg-[#F3F3F3] rounded">
          <TransactionIcon category={data.category} />
        </div>

        <div className="flex flex-col gap-[2px]">
          <h3 className="text-xs font-semibold font-red-hat">{data.title}</h3>
          <p className="text-[#898989] text-[10px] md:text-xs">{data.category}</p>
        </div>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        <p className={clsx(
          "text-xs font-red-hat",
          {
            "text-primary": data.type === 'WITHDRAW',
            "text-green-600": data.type === 'DEPOSIT',
          }
        )}>
          {formatCurrency(data.value, data.type)}
        </p>

        <TransactionEditorDrawer
          data={data}
          onUpdate={(updatedTransaction) => {
            onTransactionUpdate?.(updatedTransaction)
          }}
        />
      </div>
    </article>)
}