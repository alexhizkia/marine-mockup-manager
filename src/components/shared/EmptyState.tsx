
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  className?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionIcon,
  onAction,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-4 sm:p-6 md:p-8 animate-fadeIn",
        className
      )}
    >
      {icon && (
        <div className="mb-3 md:mb-4 rounded-full p-3 md:p-4 bg-gray-100 dark:bg-navy-800 text-gray-500 dark:text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="mt-2 text-base sm:text-lg font-medium">{title}</h3>
      {description && (
        <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-3 md:mt-4 btn-hover text-xs sm:text-sm"
          size="sm"
        >
          {actionIcon && <span className="mr-1.5">{actionIcon}</span>}
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
