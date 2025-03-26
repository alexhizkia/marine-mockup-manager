
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

interface AnimatedCardProps {
  title?: string;
  description?: string;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  animate?: "fadeIn" | "slideUp" | "none";
  delay?: string;
  hover?: boolean;
  onClick?: () => void;
}

const AnimatedCard = ({
  title,
  description,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  children,
  footer,
  animate = "fadeIn",
  delay = "0s",
  hover = true,
  onClick,
}: AnimatedCardProps) => {
  const animationClass = animate === "fadeIn" 
    ? "animate-fadeIn" 
    : animate === "slideUp" 
      ? "animate-slideUp" 
      : "";

  return (
    <Card 
      className={cn(
        "overflow-hidden bg-card dark:bg-navy-800 border border-border dark:border-navy-700", 
        hover && "card-hover",
        animationClass,
        className
      )}
      style={{ animationDelay: delay }}
      onClick={onClick}
    >
      {(title || description) && (
        <CardHeader className={cn("p-4 sm:p-5", headerClassName)}>
          {title && <CardTitle className="text-base sm:text-lg md:text-xl">{title}</CardTitle>}
          {description && <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("p-4 sm:p-5 pt-0", !title && !description && "pt-4 sm:pt-5", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("p-4 sm:p-5 pt-0 flex items-center", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default AnimatedCard;
