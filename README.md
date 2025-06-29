# Avapay

A React TypeScript application for buying AVAX tokens in Kenya using mobile money payments.

## Features

- Real-time AVAX price tracking
- Mobile money integration for payments
- Non-custodial wallet management
- Live chat support
- Responsive design with dark/light mode
- Real-time transaction updates

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Tailwind CSS + shadcn/ui
- **Real-time Updates**: Socket.IO
- **State Management**: React Hooks

## Avapay Backend
```bash
https://github.com/rodweleo/avapay-backend
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with required variables
4. Start the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── BuyAvaxSection.tsx
│   ├── ChatInterface.tsx
│   ├── Navigation.tsx
│   └── ...
├── hooks/             # Custom React hooks
├── lib/              # Utility libraries
├── pages/            # Route pages
└── utils/            # Helper functions
```

## Configuration

The project uses several configuration files:

- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS styling
- `vite.config.ts` - Vite bundler settings
- `components.json` - UI component configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License
