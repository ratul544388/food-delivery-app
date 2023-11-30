import { cn } from "@/lib/utils";
import { PulseLoader as PulseSpinner } from "react-spinners";

interface PulseLoaderProps {
  size?: number;
  className?: string;
}

const PulseLoader: React.FC<PulseLoaderProps> = ({ size = 8, className }) => {
  return <PulseSpinner size={size} color="#DD1C47" className={cn(className)} />;
};

export default PulseLoader;
