
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { cva } from "class-variance-authority";

const statCardVariants = cva(
  "flex rounded-lg p-4 transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-navy-800 border border-border dark:border-navy-700",
        primary: "bg-marine-50 dark:bg-marine-900/20 text-marine-800 dark:text-marine-200 border border-marine-100 dark:border-marine-800/40",
        secondary: "bg-gray-50 dark:bg-navy-800/50 border border-gray-100 dark:border-navy-700/50",
        success: "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-100 dark:border-green-800/40",
        warning: "bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 border border-amber-100 dark:border-amber-800/40",
        danger: "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-100 dark:border-red-800/40",
        info: "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-100 dark:border-blue-800/40",
        glass: "glass-card"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "glass";
  children?: React.ReactNode;
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  change,
  changeType,
  className,
  variant = "default",
  children
}: StatCardProps) => {
  return (
    <Card className={cn(statCardVariants({ variant }), "animate-fadeIn hover:shadow-md card-hover", className)}>
      <div className="flex items-start w-full">
        {icon && (
          <div className="mr-4 rounded-full p-2.5 bg-gray-100/80 dark:bg-navy-700/50 text-gray-700 dark:text-gray-200">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {change && (
              <span 
                className={cn(
                  "ml-2 text-xs font-medium rounded-full px-1.5 py-0.5",
                  changeType === "increase" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : 
                  changeType === "decrease" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : 
                  "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                )}
              >
                {change}
              </span>
            )}
          </div>
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
          {children}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
