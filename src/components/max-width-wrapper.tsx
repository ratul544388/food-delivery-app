import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn("max-w-screen-2xl w-full mx-auto px-3 sm:px-6", className)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
