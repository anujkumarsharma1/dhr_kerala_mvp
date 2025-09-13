// components/ui/Select.jsx - Shadcn style Select
import React, { useState } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import Input from "./Input";

const Select = React.forwardRef(({
    className,
    options = [],
    value,
    defaultValue,
    placeholder = "Select an option",
    multiple = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    searchable = false,
    clearable = false,
    loading = false,
    id,
    name,
    onChange,
    onOpenChange,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Generate unique ID if not provided with better random handling
    const selectId = id || `select-${Math.random()?.toString(36)?.substr(2, 9) || 'fallback'}`;

    // Ensure options is always an array and sanitize each option
    const safeOptions = Array.isArray(options) ? options?.filter(option => option !== null && option !== undefined)?.map(option => {
        // Ensure each option is an object with value and label/name properties
        if (typeof option === 'string' || typeof option === 'number') {
            return { value: option, label: String(option) };
        }
        if (typeof option === 'object' && option !== null) {
            return {
                ...option,
                value: option?.value !== undefined ? option?.value : '',
                label: option?.label || option?.name || String(option?.value || ''),
                name: option?.name || option?.label || String(option?.value || '')
            };
        }
        return null;
    })?.filter(Boolean) : [];

    // Filter options based on search with enhanced safety
    const filteredOptions = searchable && searchTerm
        ? safeOptions?.filter(option => {
            if (!option || typeof option !== 'object') return false;
            
            const label = String(option?.label || option?.name || '')?.toLowerCase();
            const optionValue = String(option?.value || '')?.toLowerCase();
            const searchTermLower = String(searchTerm || '')?.toLowerCase();
            
            return label?.includes(searchTermLower) || optionValue?.includes(searchTermLower);
        }) || []
        : safeOptions;

    // Get selected option(s) for display with enhanced safety
    const getSelectedDisplay = () => {
        if (!value) return placeholder;

        if (multiple) {
            if (!Array.isArray(value) || value?.length === 0) return placeholder;
            
            const selectedOptions = safeOptions?.filter(opt => {
                return opt && value?.includes(opt?.value);
            }) || [];
            
            if (selectedOptions?.length === 0) return placeholder;
            if (selectedOptions?.length === 1) {
                const option = selectedOptions?.[0];
                return String(option?.label || option?.name || option?.value || '');
            }
            return `${selectedOptions?.length} items selected`;
        }

        const selectedOption = safeOptions?.find(opt => opt && opt?.value === value);
        return selectedOption ? String(selectedOption?.label || selectedOption?.name || selectedOption?.value || '') : placeholder;
    };

    const handleToggle = () => {
        if (!disabled) {
            const newIsOpen = !isOpen;
            setIsOpen(newIsOpen);
            onOpenChange?.(newIsOpen);
            if (!newIsOpen) {
                setSearchTerm("");
            }
        }
    };

    const handleOptionSelect = (option) => {
        if (!option || typeof option !== 'object') return;
        
        if (multiple) {
            const newValue = Array.isArray(value) ? value : [];
            const optionValue = option?.value;
            
            if (optionValue !== undefined) {
                const updatedValue = newValue?.includes(optionValue)
                    ? newValue?.filter(v => v !== optionValue)
                    : [...newValue, optionValue];
                onChange?.(updatedValue);
            }
        } else {
            const optionValue = option?.value;
            if (optionValue !== undefined) {
                onChange?.(optionValue);
                setIsOpen(false);
                onOpenChange?.(false);
            }
        }
    };

    const handleClear = (e) => {
        e?.stopPropagation();
        onChange?.(multiple ? [] : '');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(String(e?.target?.value || ''));
    };

    const isSelected = (optionValue) => {
        if (multiple) {
            return Array.isArray(value) ? value?.includes(optionValue) : false;
        }
        return value === optionValue;
    };

    const hasValue = multiple 
        ? (Array.isArray(value) && value?.length > 0) 
        : (value !== undefined && value !== '' && value !== null);

    return (
        <div className={cn("relative", className)}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
                        error ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <button
                    ref={ref}
                    id={selectId}
                    type="button"
                    className={cn(
                        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-destructive focus:ring-destructive",
                        !hasValue && "text-muted-foreground"
                    )}
                    onClick={handleToggle}
                    disabled={disabled}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    {...props}
                >
                    <span className="truncate">{getSelectedDisplay()}</span>

                    <div className="flex items-center gap-1">
                        {loading && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}

                        {clearable && hasValue && !loading && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={handleClear}
                                tabIndex={-1}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}

                        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                    </div>
                </button>

                {/* Hidden native select for form submission */}
                <select
                    name={name}
                    value={multiple ? '' : (value || '')}
                    onChange={() => { }} // Controlled by our custom logic
                    className="sr-only"
                    tabIndex={-1}
                    multiple={multiple}
                    required={required}
                >
                    <option value="">Select...</option>
                    {safeOptions?.map((option, index) => {
                        if (!option || typeof option !== 'object') return null;
                        return (
                            <option key={`${option?.value}-${index}` || index} value={String(option?.value || '')}>
                                {String(option?.label || option?.name || option?.value || '')}
                            </option>
                        );
                    })}
                </select>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white text-black border border-border rounded-md shadow-md">
                        {searchable && (
                            <div className="p-2 border-b">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search options..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="py-1 max-h-60 overflow-auto">
                            {!Array.isArray(filteredOptions) || filteredOptions?.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                    {searchTerm ? 'No options found' : 'No options available'}
                                </div>
                            ) : (
                                filteredOptions?.map((option, index) => {
                                    if (!option || typeof option !== 'object') return null;
                                    
                                    const optionValue = option?.value;
                                    const optionLabel = String(option?.label || option?.name || option?.value || '');
                                    const optionKey = `${optionValue}-${index}` || `option-${index}`;
                                    
                                    return (
                                        <div
                                            key={optionKey}
                                            className={cn(
                                                "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                                isSelected(optionValue) && "bg-primary text-primary-foreground",
                                                option?.disabled && "pointer-events-none opacity-50"
                                            )}
                                            onClick={() => !option?.disabled && handleOptionSelect(option)}
                                        >
                                            <span className="flex-1">{optionLabel}</span>
                                            {multiple && isSelected(optionValue) && (
                                                <Check className="h-4 w-4" />
                                            )}
                                            {option?.description && (
                                                <span className="text-xs text-muted-foreground ml-2">
                                                    {String(option?.description || '')}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}
            </div>
            {description && !error && (
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            )}
            {error && (
                <p className="text-sm text-destructive mt-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export default Select;