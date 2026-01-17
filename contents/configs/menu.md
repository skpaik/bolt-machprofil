---
show:
  - home
  - about
  - experience
  - projects
  - blog
  - resume

optional:
  - education
  - skills
  - services
  - publications
  - certificates
  - testimonials
  - photos
  - contact
  - privacy
  - terms

hide:
  - services
  - publications
---

# Menu Configuration Instructions

This file controls which menus appear on the site and where they appear.

## How it works

- **show**
  - Add menu keys here to display them as **primary menus**
  - These appear directly in the main navigation bar
  - The order you write is the order they appear
  - These are primary menus and appear only if space is available

- **optional**
  - Add menu keys here to display them under the **More** menu
  - These are secondary menus and appear only in **More** menu

- **hide**
  - Add menu keys here to **never show them**
  - This overrides both `show` and `optional`

## Important rules

- If a menu is **not listed** in `show`, `optional`, or `hide`, it will **not appear**, even if content exists.
- If a menu is listed but **no content exists** for that menu (in the current language), it will be **automatically hidden**.
- Menu availability is **language-dependent**. A menu may appear in one language and be hidden in another.
- Only predefined menu keys are allowed. Invalid keys will cause a build error.

## Supported menu keys

- home  
- about  
- experience  
- projects  
- blog  
- resume  
- education  
- skills  
- services  
- publications  
- certificates  
- testimonials  
- photos  
- contact  
- privacy  
- terms
