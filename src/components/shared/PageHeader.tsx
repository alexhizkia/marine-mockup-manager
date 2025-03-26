
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, subtitle, className, children }: PageHeaderProps) => {
  return (
    <div className={cn("mb-4 sm:mb-6 md:mb-8 animate-slideDown", className)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm md:text-base text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {children && <div className="mt-3 md:mt-0 flex items-center space-x-2">{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
