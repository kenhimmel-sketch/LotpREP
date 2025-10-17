import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  useEffect(() => {
    if (toasts.length > 0) {
      const latestToast = toasts[toasts.length - 1]
      if (latestToast.open) {
        // Emit custom event for programmatic detection
        const event = new CustomEvent("ToastShown", {
          detail: {
            message: latestToast.title || latestToast.description,
            variant: latestToast.variant || "default"
          }
        })
        window.dispatchEvent(event)
        
        // Console log for debugging
        console.log("ToastShown", {
          message: latestToast.title || latestToast.description,
          variant: latestToast.variant || "default"
        })
      }
    }
  }, [toasts])

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} data-testid="toast-root" {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
