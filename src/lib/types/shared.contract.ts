import {SortOption} from "@/lib/types/type.config";

export interface FilterOption {
    value: string;
    label: string;
}

export interface SortFilterOption {
    value: SortOption;
    label: string;
}

export interface FilterConfig {
    name: string;
    label: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
}

export interface SortConfig {
    value: string;
    options: SortFilterOption[];
    onChange: (value: string) => void;
}