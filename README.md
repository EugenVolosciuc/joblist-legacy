# Job List

Manage multiple job listing websites.

This codebase is the baseline for multiple job listing website. Every website makes use of this code, the difference being some configuration set through environment variables.

## Architecture

We use NextJS' potential to the max, keeping our frontend and backend in the same repository.

### Stack

- [Typescript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/) (Frontend and API)
- [Prisma](https://www.prisma.io/) (ORM)
- [Supabase](https://supabase.com/) (Database and storage)
- [ChakraUI](https://chakra-ui.com/) (UI Framework)
- [Vercel](https://vercel.com/) (Hosting)
- [Stripe](https://stripe.com/) (Payments)
- ? (Mail)

## Settings

These website settings can be grouped as such:

- general
  - ID
  - Title
  - Logo
- pages
  - Homepage
- components (ChakraUI component settings)
  - Toast
- themes (ChakraUI theme)

### General

These settings are related to the website name and logo. The ID is very important, as we set the other settings based on it. The ID should use only lowercase characters (e.g. `threedjoblist`).

### Pages

The page settings sets different variants for various pages. The structure of these settings is as follows:

- pageTitle[] (e.g. Homepage)
  - variant[] (e.g. one, can be named anything, lowercase)

### Components

The component settings set the default ChakraUI component behaviour. These settings do not customize the appearence of the components (except when such props are present in a component's settings (e.g. a Toast's variant)). To change a component's appearence use the Theme settings. Setting structure:

- componentTitle (e.g. Toast)
  - settings[] (e.g. one, can be named anything, lowercase)

### Themes

The theme settings choose between different variants of custom ChakraUI themes. Every website has a theme of its own. Setting structure:

- themeTitle[] (e.g. threedjoblist, has to be an APP_ID)

## Websites

- 3DJobList
