# autogen-magentic-one-demo-fe
[![Azure Static Web Apps CI/CD](https://github.com/michalmar/autogen-magentic-one-demo-fe/actions/workflows/azure-static-web-apps-black-plant-083682f0f.yml/badge.svg)](https://github.com/michalmar/autogen-magentic-one-demo-fe/actions/workflows/azure-static-web-apps-black-plant-083682f0f.yml)

This is a AutoGen with MagenticOne demo front-end project built with React, Vite, and Tailwind CSS. 

It demonstrates a chat interface integrated with a sidebar, markdown rendering, and agent management. The application also includes various UI components such as dialogs, buttons, and avatars.

![Screenshot](/assets/home.png)

## Features

- **Chat Interface:** Supports sending messages and displaying chat history with markdown rendering and syntax-highlighted code snippets.
- **Sidebar Navigation:** Includes components for projects and app settings.
- **Agents Setup:** Manage agents (like Coder, FileSurfer, and others) with UI interactions.
- **Markdown Support:** Render markdown content with code block syntax highlighting and copy-to-clipboard functionality.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

  ```sh
  git clone <repository-url>
  ```
2. Navigate to the project directory:

  ```sh
  cd frontend
  ```
Install dependencies:

```sh
npm install
```

Running the Project
To start the development server, run:

```sh
npm run dev
```

This will launch the application at http://localhost:3000.

Building for Production
To create a production build, run:

```sh
npm run build
```

Additional Scripts
Preview the Production Build:

Project Structure
- src/App.tsx: Contains the core application logic including the chat interface and handling API calls.
- src/components/: Houses UI components like the sidebar, agents setup, and markdown display.
- src/lib/utils.ts: Utility functions used across the application.

For more detailed information, refer to inline comments within the source files.

License
This project is licensed under the MIT License.


## Deployment

> Note: details coming soon...

Automaticly deployed using GitHub Actions.


