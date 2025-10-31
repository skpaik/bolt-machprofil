
export interface FilterOption {
    value: string;
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
    options: FilterOption[];
    onChange: (value: string) => void;
}