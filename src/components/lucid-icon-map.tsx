"use client";

import React from 'react';
import {
    AlertCircle,
    BarChart,
    Clock,
    Cloud,
    Code,
    Database,
    DollarSign,
    FileText,
    Lock,
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
    Users,
    Video,
    Wrench
} from 'lucide-react';


// Icon mapping
const lucidIconMap: { [key: string]: React.ReactNode } = {
    'Code': <Code className="w-6 h-6"/>,
    'Palette': <Palette className="w-6 h-6"/>,
    'Smartphone': <Smartphone className="w-6 h-6"/>,
    'Database': <Database className="w-6 h-6"/>,
    'Cloud': <Cloud className="w-6 h-6"/>,
    'Search': <Search className="w-6 h-6"/>,
    'Megaphone': <Megaphone className="w-6 h-6"/>,
    'BarChart': <BarChart className="w-6 h-6"/>,
    'Pen': <Pen className="w-6 h-6"/>,
    'Video': <Video className="w-6 h-6"/>,
    'ShoppingCart': <ShoppingCart className="w-6 h-6"/>,
    'Users': <Users className="w-6 h-6"/>,
    'Settings': <Settings className="w-6 h-6"/>,
    'Technical': <Code className="w-6 h-6"/>,
    'Design': <Palette className="w-6 h-6"/>,
    'Business': <TrendingUp className="w-6 h-6"/>,
    'Soft Skills': <MessageSquare className="w-6 h-6"/>,
    'Languages': <MessageSquare className="w-6 h-6"/>,
    'Tools': <Wrench className="w-6 h-6"/>,
    'FileText': <FileText className="w-6 h-6"/>,
    'DollarSign': <DollarSign className="w-6 h-6"/>,
    'Lock': <Lock className="w-6 h-6"/>,
    'Clock': <Clock className="w-6 h-6"/>,
    'AlertCircle': <AlertCircle className="w-6 h-6"/>,
    'Shield': <Shield className="w-6 h-6"/>
};
// Category icons mapping
export const getLucidIcon = (icon: string) => {
    return lucidIconMap[icon] || <Star className="w-6 h-6"/>;
};