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
- **Photographer**: Portfolio photos, creative work, equipment
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
Recently I have made a lot of changes.

Check all the pages in src/app folder.

I have added some sample file, which contents is not correct as I copy from other location.

like testimonials. services, about, terms, privacy and some other pages contents are not correct as the folder name.

So update all contents and fields related to the page/folder names with sample data as other pages uses the sample data from a single file.

change the typescript interfaces property from allow null or not based on standard.

I have added filters, search, sort in blog, photos, projects with paginations.

Add those features if any page required it by following the same structure,

You can add paginations only or filtersbar only if thats enough for a page.

I not sure that any pages needed any details page except blog, If required add that too.

