
interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={`bg-[#3E3E5E] animate-pulse rounded-lg ${className}`} />
  );
}
