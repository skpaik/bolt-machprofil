"use client";

import React from 'react';
import {
    AlertCircle,
    BarChart,
    Clock,
    Cloud,
    Code,
    Cookie,
    Database,
    DollarSign,
    Eye,
    FileText,
    Lock,
    LucideIcon,
    Mail,
    Megaphone,
    MessageSquare,
    Palette,
    Pen,
    Search,
    Settings,
    Shield,
    ShoppingCart,
    Smartphone,
    Star,
    TrendingUp,
    UserCheck,
    Users,
    Video,
    Wrench
} from 'lucide-react'; // Icon mapping

// Icon mapping for dynamic lookup
export const ICON_MAP: { [key: string]: LucideIcon } = {
    'eye': Eye,
    'cookie': Cookie,
    'user-check': UserCheck,
    'mail': Mail,
    'code': Code,
    'palette': Palette,
    'smartphone': Smartphone,
    'database': Database,
    'cloud': Cloud,
    'search': Search,
    'megaphone': Megaphone,
    'bar-chart': BarChart,
    'pen': Pen,
    'video': Video,
    'shopping-cart': ShoppingCart,
    'users': Users,
    'settings': Settings,
    'technical': Code,
    'design': Palette,
    'business': TrendingUp,
    'soft-skills': MessageSquare,
    'languages': MessageSquare,
    'tools': Wrench,
    'fileText': FileText,
    'dollar-sign': DollarSign,
    'lock': Lock,
    'clock': Clock,
    'alert-circle': AlertCircle,
    'shield': Shield
};

export const showLucidIcon = (icon: string) => {
    const IconComponent = ICON_MAP[icon];
    return <IconComponent className="w-5 h-5 text-primary"/>;
};