import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface AlertPaginationProps {
  page: number
  pageSize: number
  total: number
  totalPages: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

const pageSizeOptions = [5, 8, 12, 20, 50]

export function AlertPagination({
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: AlertPaginationProps) {
  const safePage = Math.min(Math.max(1, page), Math.max(1, totalPages))
  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1
  const end = Math.min(safePage * pageSize, total)

  const pages = getPageNumbers(safePage, totalPages)

  return (
    <div className="flex flex-col gap-3 px-4 py-3 border-t border-slate-200/10 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>
          Hiển thị <span className="font-semibold text-slate-700 dark:text-slate-200">{start}-{end}</span>{' '}
          trên tổng <span className="font-semibold text-slate-700 dark:text-slate-200">{total}</span> cảnh báo
        </span>
        <span className="hidden h-4 w-px bg-slate-200 dark:bg-slate-800 sm:block" />
        <div className="hidden items-center gap-2 sm:flex">
          <span>Số dòng:</span>
          <Select value={String(pageSize)} onValueChange={(v) => onPageSizeChange(Number(v))}>
            <SelectTrigger className="h-8 w-[72px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={safePage <= 1}
          onClick={() => onPageChange(1)}
          aria-label="Trang đầu"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          aria-label="Trang trước"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {pages.map((p, idx) =>
            p === '...' ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-1 text-xs text-slate-400 select-none"
              >
                …
              </span>
            ) : (
              <Button
                key={p}
                variant={p === safePage ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(p as number)}
                className={cn(
                  'h-8 min-w-[32px] px-2 text-xs',
                  p === safePage && 'shadow-md shadow-primary/25'
                )}
              >
                {p}
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          aria-label="Trang sau"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          aria-label="Trang cuối"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  const result: (number | '...')[] = []
  const window = 1

  if (total <= 7) {
    for (let i = 1; i <= total; i++) result.push(i)
    return result
  }

  result.push(1)
  if (current - window > 2) result.push('...')
  for (let i = Math.max(2, current - window); i <= Math.min(total - 1, current + window); i++) {
    result.push(i)
  }
  if (current + window < total - 1) result.push('...')
  result.push(total)
  return result
}