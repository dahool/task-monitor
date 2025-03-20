import { initializeDb } from "./server/repository"

export function register() {
    (async () => {
        console.log('Run migrations...')
        await initializeDb()
        console.log('Done migrations')
    })();
}