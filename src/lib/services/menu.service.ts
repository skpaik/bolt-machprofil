import {PrimaryMenuItem} from "@/lib/types/portfolio";
import {
    Book,
    Briefcase,
    Calendar,
    Clock,
    Contact,
    FileText,
    FileUser,
    GraduationCap,
    Home,
    Mail,
    User
} from "lucide-react";

export class MenuService {
    static primaryMenuItems2: PrimaryMenuItem[] = [
        {key: 'home', path: '/', icon: Home},
        {key: 'projects', path: '/projects', icon: Briefcase},
        {key: 'experience', path: '/experience', icon: Calendar},
        {key: 'blog', path: '/blog', icon: FileText},
        {key: 'education', path: '/education', icon: GraduationCap},
        {key: 'resume', path: '/resume', icon: Book},
        {key: 'contact', path: '/contact', icon: Contact},
    ];

    static moreMenuItems2: PrimaryMenuItem[] = [
        {key: 'about', path: '/about'},
        {key: 'privacy', path: '/legal/privacy'},
        {key: 'terms', path: '/legal/terms'},
        {key: 'services', path: '/services'},
        {key: 'skills', path: '/skills'},
        {key: 'testimonials', path: '/testimonials'},
        {key: 'publications', path: '/publications',},
        {key: 'certificates', path: '/certificates'},
        {key: 'photos', path: '/photos'},
    ];

    static primaryMenuItems: PrimaryMenuItem[] = [
        {key: 'home', path: '/', icon: Home},
        {key: 'about', path: '/about', icon: User},
        {key: 'projects', path: '/projects', icon: Briefcase},
        {key: 'experience', path: '/experience', icon: Clock},
        {key: 'blog', path: '/blog', icon: FileText},
        {key: 'resume', path: '/resume', icon: FileUser},
        {key: 'contact', path: '/contact', icon: Mail},
    ];

    static moreMenuItems: PrimaryMenuItem[] = [
        {key: 'education', path: '/education'},
        {key: 'skills', path: '/skills'},
        {key: 'services', path: '/services'},
        {key: 'testimonials', path: '/testimonials'},
        {key: 'publications', path: '/publications'},
        {key: 'certificates', path: '/certificates'},
        {key: 'photos', path: '/photos'},
        {key: 'privacy', path: '/legal/privacy'},
        {key: 'terms', path: '/legal/terms'},
    ];
}