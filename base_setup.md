# Base Setup

This is how I set up the project prior to the seminar.

## Installation

Steps for installing **Vite** and **Vitest**.

### 1. Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** (comes with Node.js)

You can verify your installation by running:

```bash
node -v
npm -v
```

### 2. Create a Vite App

To create a new Vite application, run the following command:

```bash
npm create vite@latest transaction-app --template vanilla
```

- Replace `transaction-app` with your desired project name.
- Select the `vanilla` template when prompted.

### 3. Navigate to the Project Directory

```bash
cd transaction-app
```

## 4. Install Vitest

```bash
npm install -D vitest
```

In the `package.json`:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

For the rest of the setup see the [README](./README.md).
