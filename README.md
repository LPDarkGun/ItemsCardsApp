Sure, here's the complete README file in markdown format:

```markdown
# Items Cards App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

The Items Cards App is a web application that allows users to add, edit, and remove items with descriptions, images, and tags. The app supports light and dark modes, and it is optimized for both desktop and mobile views. The items are stored in a MongoDB database, and the app uses Redux for state management.

## Features
- Add, edit, and remove items with descriptions, images, and tags.
- Light and dark mode toggle.
- Search functionality with highlighted text.
- Persistent storage using MongoDB.
- Smooth animations using GSAP.
- Sortable items using Sortable.js.
- Automatic deletion of items when storage exceeds 490MB to prevent overuse of storage space.


## Cons
- NO responsive design for mobile and desktop views.

## Dependencies

The project uses the following dependencies:

- `next`: The React framework for production.
- `react`: A JavaScript library for building user interfaces.
- `react-dom`: This package serves as the entry point to the DOM and server renderers for React.
- `react-redux`: Official React bindings for Redux.
- `redux`: A Predictable State Container for JS Apps.
- `@reduxjs/toolkit`: The official, recommended way to write Redux logic.
- `axios`: Promise based HTTP client for the browser and node.js.
- `mongoose`: MongoDB object modeling tool designed to work in an asynchronous environment.
- `sortablejs`: A JavaScript library for reorderable drag-and-drop lists.
- `gsap`: A robust JavaScript library that lets you animate anything.
- `tailwindcss`: A utility-first CSS framework for rapidly building custom designs.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## API Routes

API routes can be accessed on [http://localhost:3000/api/items](http://localhost:3000/api/items). This endpoint can be edited in `pages/api/items.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Folder Structure

Here is a brief overview of the project's folder structure:

```
└── 📁redux
    └── .env.local
    └── .eslintrc.json
    └── .gitignore
    └── README.md
    └── 📁components
        └── DarkModeToggle.js
        └── FormInputs.js
        └── ItemCard.js
    └── jsconfig.json
    └── 📁lib
        └── mongoose.js
    └── 📁model
        └── items.js
    └── next.config.mjs
    └── package-lock.json
    └── package.json
    └── 📁pages
        └── _app.js
        └── _document.js
        └── 📁api
            └── hello.js
            └── items.js
        └── index.js
    └── postcss.config.mjs
    └── 📁public
        └── favicon.ico
        └── next.svg
        └── vercel.svg
    └── 📁store
        └── counterSlice.js
        └── itemSlice.js
        └── store.js
        └── userSlice.js
    └── 📁styles
        └── globals.css
    └── tailwind.config.js
```

## MongoDB Setup

This project uses MongoDB for persistent storage. Make sure to set up your MongoDB database and add your connection string to the `.env.local` file:

```
MONGODB_URI=your-mongodb-connection-string
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
```

This markdown file should provide all the necessary information for setting up, running, and understanding the project.# ItemsCardsApp
# ItemsCardsApp
# ItemsCardsApp
