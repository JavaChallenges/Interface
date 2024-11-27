/**
 * Registers the production instrumentation if the environment is set to production.
 *
 * This function dynamically imports the `production-instrumantation` module
 * if the `NODE_ENV` environment variable is set to 'production'.
 *
 * @returns {Promise<void>} A promise that resolves when the module is imported.
 */
export async function register() {
    if (process.env.NODE_ENV === 'production') {
        await import('./production-instrumantation')
    }
}