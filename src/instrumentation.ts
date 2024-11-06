
export async function register() {
    if (process.env.NODE_ENV === 'production') {
        await import('./production-instrumantation')
    }
}