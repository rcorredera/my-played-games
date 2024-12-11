# Vue 3 + Vite: A Template for Vue 3 Development

This project is a template to help developers get started with Vue 3 development using Vite. It utilizes Vue 3's `<script setup>` Single-File Components (SFCs), and the README provides links to relevant documentation for further learning.

## Getting Started

To start developing with this template, follow these steps:

1. Clone the repository: `git clone https://github.com/vuejs/vue-next-template-vite.git`
2. Navigate to the project directory: `cd vue-next-template-vite`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm run dev` or `yarn dev`

## Project Structure

The project is organized into the following directories and files:

- **src:** This directory contains the main source code for the application, including the main entry file (main.ts), a TypeScript configuration file (tsconfig.json), a Vue component (App.vue), and a TypeScript declaration file for the environment (env.d.ts). The src directory also contains subdirectories for components and data.
- **assets:** This directory holds various assets such as SVG files, CSS files, and a directory for flags.
- **components:** This directory contains Vue components, including GameItem.vue, GameList.vue, LanguageSelector.vue, PlatformIcons.ts, QuickFilters.vue, SearchBar.vue, and ThemeToggle.vue.
- **data:** This directory contains a JSON file (games.json) that likely holds game data.
- **locales:** This directory contains JSON files (en.json and fr.json) for localization.
- **public:** This directory contains static files, such as the vite.svg file and a directory for flags.
- **dist:** This directory contains the compiled output of the project.
## Adding a Game to the List

To add a game to the list, you can use the `addGame.mjs` script. This script fetches game information from the IGDB API and adds it to the JSON file containing the games.

### Prerequisites

- Ensure that Node.js is installed on your machine.
- Obtain your `CLIENT_ID` and `ACCESS_TOKEN` from the IGDB API.

### Usage

1. Open a terminal or command prompt.
2. Navigate to the directory containing the `addGame.mjs` script.
3. Run the following command, replacing `<CLIENT_ID>`, `<ACCESS_TOKEN>`, and `<GAME_ID>` with your actual values:

   ```
   node addGame.mjs <CLIENT_ID> <ACCESS_TOKEN> <GAME_ID>
   ```
    
## Notable Aspects

- The use of Vue.js and TypeScript indicates a focus on component-based development and type safety.
- The presence of a tsconfig.node.json file suggests that the project may also include Node.js-related code or dependencies.
- The organization of components, data, and locales into separate directories demonstrates a clear structure for managing different aspects of the application.
- The use of JSON files for game data and localization highlights a modular approach to managing application data and resources.
- The inclusion of SVG files and CSS files in the assets directory indicates a focus on visual design and user interface.


### Prerequisites

- Ensure that Node.js is installed on your machine.
- Obtain your `CLIENT_ID` and `ACCESS_TOKEN` from the IGDB API.


## Further Learning

To learn more about Vue 3 and Vite, check out the following resources:

- [Vue 3 Documentation](https://vuejs.org/v3/guide/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Vue 3 + Vite Template on GitHub](https://github.com/vuejs/vue-next-template-vite)

Happy coding!