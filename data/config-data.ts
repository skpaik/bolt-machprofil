import {LanguageItem, PrimaryMenuItem, ProfileItem, TemplateItem} from "@/types/portfolio";
import {Briefcase, Calendar, FileText, Home} from "lucide-react";

export class ConfigData {
    static templates: TemplateItem[] = [
        {value: 'modern', label: 'Modern', description: 'Gradient & bold design'},
        {value: 'classic', label: 'Classic', description: 'Traditional & elegant'},
        {value: 'minimal', label: 'Minimal', description: 'Clean & simple'},
    ];

    static profiles: ProfileItem[] = [
        {code: 'developer', name: 'Developer'},
        {code: 'photographer', name: 'Photographer'},
        {code: 'teacher', name: 'Teacher'},
        {code: 'student', name: 'Student'},
    ];

    static languages: LanguageItem[] = [
        {code: 'en', name: 'English'},
        {code: 'es', name: 'Español'},
        {code: 'fr', name: 'Français'},
    ];

    static primaryMenuItems: PrimaryMenuItem[] = [
        {key: 'home', path: '/', icon: Home},
        {key: 'projects', path: '/projects', icon: Briefcase},
        {key: 'experience', path: '/experience', icon: Calendar},
        {key: 'blog', path: '/blog', icon: FileText},
    ];

    static moreMenuItems: PrimaryMenuItem[] = [
        {key: 'publications', path: '/publications', label: 'Publications'},
        {key: 'certificate', path: '/certificate', label: 'Certificates'},
        {key: 'gallery', path: '/gallery', label: 'Gallery'},
    ];
}