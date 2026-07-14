import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'
import { X, CheckCircle2, AlertTriangle, Info, AlertOctagon } from 'lucide-react'
import { cn } from '@/lib/utils'

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed top-4 right-4 z-[100] flex max-h-screen w-[380px] max-w-full flex-col gap-2 outline-none',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl border p-4 pr-9 shadow-2xl backdrop-blur-xl transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right-full data-[state=open]:duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=closed]:duration-200',
  {
    variants: {
      variant: {
        default: 'border-slate-200 bg-white/95 text-slate-900 dark:border-slate-700 dark:bg-slate-900/95 dark:text-white',
        success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
        warning: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
        destructive: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300',
        info: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, variant, ...props }, ref) => (
    <ToastPrimitive.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
  )
)
Toast.displayName = ToastPrimitive.Root.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-current/60 opacity-70 transition-opacity hover:text-current hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-1',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-3.5 w-3.5" />
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn('mt-1 text-xs opacity-90 leading-relaxed', className)} {...props} />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'inline-flex h-7 shrink-0 items-center justify-center rounded-md border bg-transparent px-2.5 text-xs font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

type ToastVariant = NonNullable<ToastProps['variant']>

type ToastInput = {
  title: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: { label: string; onClick: () => void }
}

interface ToastContextValue {
  show: (toast: ToastInput) => void
  success: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

interface InternalToast extends ToastInput {
  id: string
  open: boolean
}

export function ToastHost({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<InternalToast[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = React.useCallback(
    (toast: ToastInput) => {
      const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setToasts((prev) => [...prev, { id, open: true, ...toast }])
    },
    []
  )

  const helpers = React.useMemo<ToastContextValue>(
    () => ({
      show,
      success: (title, description) => show({ title, description, variant: 'success' }),
      warning: (title, description) => show({ title, description, variant: 'warning' }),
      error: (title, description) => show({ title, description, variant: 'destructive' }),
      info: (title, description) => show({ title, description, variant: 'info' }),
      dismiss,
    }),
    [show, dismiss]
  )

  const onOpenChange = (id: string, open: boolean) => {
    if (!open) dismiss(id)
  }

  return (
    <ToastContext.Provider value={helpers}>
      <ToastProvider swipeDirection="right" duration={4500}>
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant ?? 'default'}
            duration={t.duration}
            open={t.open}
            onOpenChange={(o) => onOpenChange(t.id, o)}
          >
            <ToastIcon variant={t.variant ?? 'default'} />
            <div className="flex-1 min-w-0">
              <ToastTitle>{t.title}</ToastTitle>
              {t.description && <ToastDescription>{t.description}</ToastDescription>}
              {t.action && (
                <ToastAction
                  altText={t.action.label}
                  onClick={(e) => {
                    e.preventDefault()
                    t.action?.onClick()
                    dismiss(t.id)
                  }}
                  className="mt-2"
                >
                  {t.action.label}
                </ToastAction>
              )}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  const map: Record<ToastVariant, { Icon: React.ElementType; cls: string }> = {
    default: { Icon: Info, cls: 'text-slate-500' },
    success: { Icon: CheckCircle2, cls: 'text-emerald-500' },
    warning: { Icon: AlertTriangle, cls: 'text-amber-500' },
    destructive: { Icon: AlertOctagon, cls: 'text-red-500' },
    info: { Icon: Info, cls: 'text-sky-500' },
  }
  const { Icon, cls } = map[variant]
  return (
    <div className={cn('mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/30 dark:bg-black/20', cls)}>
      <Icon className="h-4 w-4" />
    </div>
  )
}

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    return {
      show: () => undefined,
      success: () => undefined,
      warning: () => undefined,
      error: () => undefined,
      info: () => undefined,
      dismiss: () => undefined,
    }
  }
  return ctx
}

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  type ToastProps,
}