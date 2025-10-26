import {Briefcase, Calendar, FileText, Home} from "lucide-react";

export class ConfigData {
    public primaryMenuItems = [
        { key: 'home', path: '/', icon: Home },
        { key: 'projects', path: '/projects', icon: Briefcase },
        { key: 'experience', path: '/experience', icon: Calendar },
        { key: 'blog', path: '/blog', icon: FileText },
    ];
}