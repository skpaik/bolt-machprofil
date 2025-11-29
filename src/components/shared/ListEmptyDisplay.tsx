// components/shared/Pagination.tsx
import { Button } from "@/components/ui/button";
import { showLucidIcon } from "@/components/lucid-icon-map";

export interface ListEmptyDisplayProps {
  title: string;
  message: string;
  handleClearAll: () => void;
}

export function ListEmptyDisplay({
  title,
  message,
  handleClearAll,
}: ListEmptyDisplayProps) {
  return (
    <div className="text-center py-12">
      <div className="text-muted-foreground mb-4">
        {showLucidIcon("search", "mx-auto mb-4 opacity-50", 48)}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm sm:text-base">{message}</p>
      </div>
      <Button variant="outline" onClick={handleClearAll}>
        Clear all filters
      </Button>
    </div>
  );
}
