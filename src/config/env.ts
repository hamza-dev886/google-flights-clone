/**
 * Environment variables configuration and validation.
 * Exports environment variables used throughout the application.
 */

export const env = {
  VITE_API_KEY: await import.meta.env.VITE_API_KEY,
  VITE_API_BASE_URL: await import.meta.env.VITE_API_BASE_URL,
  VITE_API_HOST: await import.meta.env.VITE_API_HOST,
} as const;

// Validate environment variables
Object.entries(env).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
});
