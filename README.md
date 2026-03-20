# Jub UI 
This repository contains the source code for Jub UI, the front-end application of the Jub project. It is built using Vue 3 and Vuetify 3, providing a modern and responsive user interface.

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

After completing the installation, your environment is ready for Jub UI development.

## ✨ Features

- 🖼️ **Optimized Front-End Stack**: Leverage the latest Vue 3 and Vuetify 3 for a modern, reactive UI development experience. [Vue 3](https://v3.vuejs.org/) | [Vuetify 3](https://vuetifyjs.com/en/)
- 🗃️ **State Management**: Integrated with [Pinia](https://pinia.vuejs.org/), the intuitive, modular state management solution for Vue.
- 🚦 **Routing and Layouts**: Utilizes Vue Router for SPA navigation and vite-plugin-vue-layouts-next for organizing Vue file layouts. [Vue Router](https://router.vuejs.org/) | [vite-plugin-vue-layouts-next](https://github.com/loicduong/vite-plugin-vue-layouts-next)
- 💻 **Enhanced Development Experience**: Benefit from TypeScript's static type checking and the ESLint plugin suite for Vue, ensuring code quality and consistency. [TypeScript](https://www.typescriptlang.org/) | [ESLint Plugin Vue](https://eslint.vuejs.org/)
- ⚡ **Next-Gen Tooling**: Powered by Vite, experience fast cold starts and instant HMR (Hot Module Replacement). [Vite](https://vitejs.dev/)
- 🧩 **Automated Component Importing**: Streamline your workflow with unplugin-vue-components, automatically importing components as you use them. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- 🛠️ **Strongly-Typed Vue**: Use vue-tsc for type-checking your Vue components, and enjoy a robust development experience. [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc)

These features are curated to provide a seamless development experience from setup to deployment, ensuring that Jub UI is both powerful and maintainable.

## 💡 Usage

This section covers how to start the development server and build your project for production.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

(Repeat for npm, pnpm, and bun with respective commands.)

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.

### Local deployment for development
To deploy your project locally, use the following command:
```bash
docker compose --profile local -f jub.yml up -d
npm run dev
```

⚠️You must create `.env` files with the correct environment variables for local deployment. You can use the provided `.env.dev` file as a template and update it with the appropriate values for your local environment.




### Local deployment with Docker
To deploy your project locally using Docker, use the following command:

```bash
chmod +x ./deploy.sh
./deploy.sh .env.dev
```

If you need to change the local ports for MongoDB, Redis, or the API, you can set the following environment variables in your .<service>.env.dev file, for example: 
```bash
# .xolo.env.dev
XOLO_MONGODB_LOCAL_PORT=27018
XOLO_CACHE_REDIS_LOCAL_PORT=6379
XOLO_LOCAL_PORT=10000
# Other environment variables...
```

⚠️ Remember to create/update the .env.dev file with the correct local ports for MongoDB, Redis, and the API before running the deploy script. 

⚠️ For local development, the `invitado` user is created with the default password `invitado`. If you want to set a different password, you can do so by setting the `VITE_DEFAULT_GUEST_PASSWORD` environment variable in your .env.dev file. For example: 
```bash
VITE_DEFAULT_GUEST_PASSWORD="<your_desired_password>"
```

#### Create `invitado` user for local development
To create the `invitado` user with read-only access to the dashboard:

```bash
chmod +x ./create_user.sh
./create_user.sh <username> <password>
```

⚠️ If you don't provide a username and password, the script will create a user with the default credentials: `invitado`/`invitado`. 


#### Create test observatories for local testing
To create test observatories you can upload the `obs_test.yml` file using the `CREAR UN OBSERVATORIO` button in the UI, or you can use the following command:

```bash
chmod +x ./create_test_observatories.sh
./create_test_observatories.sh
```


### Building for Production

To build your project for production, use:

```bash
npm run build
```

(Repeat for npm, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.



### Building for Production (Docker)

To build your project for production using Docker, use:

```bash
chmod +x ./build.sh
./build.sh jub:ui
```


## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2026 Ignacio Castillo
