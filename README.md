# Portfolio Website

A modern, highly customizable portfolio website built with Next.js 13, TypeScript, and Tailwind CSS. Features multiple visual templates, professional profiles, and multi-language support.

## Key Features

### Visual Templates
Switch between different design aesthetics:
- **Modern**: Bold, vibrant design with gradients and animations
- **Classic**: Traditional, elegant layout with serif typography  
- **Minimal**: Clean, spacious design with subtle styling

### Professional Profiles
Pre-configured profiles for different professions:
- **Developer**: Tech stack, coding projects, technical skills
- **Photographer**: Portfolio gallery, creative work, equipment
- **Teacher**: Curriculum, teaching experience, educational projects

### Additional Features
- **Multi-language Support**: English, Spanish, and French
- **Theme Switching**: Light and dark modes
- **Resume/CV Page**: Professional CV with PDF download (print functionality)
- **Fully Responsive**: Optimized for all screen sizes with max-width container
- **Dynamic Content**: All content driven by JSON data
- **Type-safe**: Full TypeScript implementation

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## Customization

### Templates vs Profiles

**Templates** control the visual appearance (Modern/Classic/Minimal)  
**Profiles** control the content displayed (Developer/Photographer/Teacher)

Change templates and profiles using the buttons in the footer.

### Adding Your Data

Edit `/data/portfolio.json` to customize your portfolio information.

## Pages

- **/** - Home page with profile overview
- **/projects** - Project showcase
- **/experience** - Work history
- **/skills** - Skills with progress indicators
- **/resume** - CV with PDF download
- **/contact** - Contact form

## Technology Stack

- Next.js 13, TypeScript, Tailwind CSS
- shadcn/ui components
- Lucide React icons

## License

MIT

## Command
Template change meaning different layout. Not the existing layout. On change of template total layout will change to a new design.

Apart from current 3 template, in future I will add more template.

Also attach a blog/article menu. on click on the page blog will show with paginations.

Details blog can also be visible.

Also show the top 4 menu in main list. rest of the menu links go under more link.
