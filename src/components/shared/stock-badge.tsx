interface StockBadgeProps {
  stock: number
}

export default function StockBadge({ stock }: StockBadgeProps) {
  if (stock <= 0) {
    return (
      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
        Out of Stock
      </span>
    )
  }

  if (stock <= 5) {
    return (
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
          Low Stock
        </span>
        <span className="text-sm text-gray-600">({stock})</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
        In Stock
      </span>
      <span className="text-sm text-gray-600">({stock})</span>
    </div>
  )
}
