# AngularJumpStart

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Linting

### TS and HTML Linting with ESLint

This project uses ESLint with TypeScript ESLint and Angular ESLint. The ESLint configuration is defined in `eslint.config.js`.

Install Required Packages:

```bash
npm install --save-dev eslint typescript-eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser
```

To lint TypeScript and Angular template files:

```bash
npx eslint .
npx eslint "src/**/*.{ts,html}" # Recommended
```

To automatically fix fixable issues:

```bash
npx eslint . --fix
npx eslint "src/**/*.{ts,html}" --fix # Recommended
```

### CSS Linting with Stylelint

This project uses Stylelint to lint CSS files. The Stylelint configuration is defined in `.stylelintrc.json`.

Install the required packages:

```bash
npm install --save-dev stylelint stylelint-config-standard
```

Then lint your CSS files:

```bash
npx stylelint .
npx stylelint "src/**/*.css" # Recommended
```

To automatically fix fixable issues:

```bash
npx stylelint . --fix
npx stylelint "src/**/*.css" --fix # Recommended
```

**Note:** This project intentionally retains some legacy Angular patterns, including constructor-based dependency injection instead of the newer inject() API. ESLint reports these patterns as warnings to highlight potential modernization opportunities, but they are intentionally preserved for compatibility with the project's legacy examples and are not treated as errors.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
