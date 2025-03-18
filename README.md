# Bimba Bolao

A soccer prediction platform allowing users to create groups with friends and place score predictions on soccer games.

## Tech Stack

- Vue.js (Frontend)
- Supabase (Backend)
- Vue I18n (Internationalization)
- Pinia (State Management)

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your Supabase credentials
4. Run the development server: `npm run dev`

## Project Structure

```
src/
├── components/     # Shared Vue components (PascalCase)
├── composables/    # Reusable logic (Vue composables, camelCase functions)
├── store/          # Pinia state management (camelCase store names)
├── utils/          # Helper functions (camelCase functions, SCREAMING_SNAKE_CASE constants)
├── locales/        # i18n translations (kebab-case files, snake_case keys)
├── views/          # Page views (PascalCase for component files)
├── assets/         # Static assets (icons, images, kebab-case filenames)
├── router/         # Vue Router configuration (camelCase route names)
└── services/       # API service calls (camelCase function names, PascalCase interfaces)
```
