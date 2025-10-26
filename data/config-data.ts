import {LanguageType, ProfileType, TemplateType} from "@/types/portfolio";
import {Briefcase, Calendar, FileText, Home} from "lucide-react";

export class ConfigData {
    static templates: { value: TemplateType; label: string; description: string }[] = [
        {value: 'modern', label: 'Modern', description: 'Gradient & bold design'},
        {value: 'classic', label: 'Classic', description: 'Traditional & elegant'},
        {value: 'minimal', label: 'Minimal', description: 'Clean & simple'},
    ];

    static profiles: { code: ProfileType; name: string }[] = [
        {code: 'developer', name: 'Developer'},
        {code: 'photographer', name: 'Photographer'},
        {code: 'teacher', name: 'Teacher'},
        {code: 'student', name: 'Student'},
    ];

    static languages: { code: LanguageType; name: string }[] = [
        {code: 'en', name: 'English'},
        {code: 'es', name: 'Español'},
        {code: 'fr', name: 'Français'},
    ];
    static primaryMenuItems: { key: string; path: string, icon: any }[] = [
        {key: 'home', path: '/', icon: Home},
        {key: 'projects', path: '/projects', icon: Briefcase},
        {key: 'experience', path: '/experience', icon: Calendar},
        {key: 'blog', path: '/blog', icon: FileText},
    ];

    static moreMenuItems: { key: string; path: string, label: string }[] = [
        {key: 'publications', path: '/publications', label: 'Publications'},
        {key: 'certificate', path: '/certificate', label: 'Certificates'},
        {key: 'gallery', path: '/gallery', label: 'Gallery'},
    ];
}