# Pokémon Battle App

This project is a Pokémon battle application built with [Create React App](https://github.com/facebook/create-react-app) and [Ant Design](https://ant.design/).

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- Node.js (>=18.18.2)
- yarn

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/davidjohn-dj/pokemon-battle.git
   cd pokemon-battle
   ```
2. **Install dependencies**:

If you encounter issues with the dependency tree, follow these steps:

1. Delete package-lock.json (not package.json) and/or yarn.lock in your project folder.
2. Delete the node_modules folder.
3. Remove "babel-jest" from dependencies and/or devDependencies in the package.json file in your project folder.
4. Then, install dependencies:

```bash
yarn install
```

If you encounter execution policy issues on Windows, temporarily bypass them with:

```bash
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

yarn install
```

### Available Scripts

In the project directory, you can run:

```bash
yarn start
```

Runs the app in the development mode.\
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```bash
yarn test
```

Launches the test runner in the interactive watch mode.\
See the section about running tests for more information.
