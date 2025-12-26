interface StockBadgeProps {
  stock: number
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock <= 0) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
        0
      </span>
    )
  }

  if (stock <= 5) {
    return (
      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
        {stock}
      </span>
    )
  }

  return (
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
      {stock}
    </span>
  )
}
