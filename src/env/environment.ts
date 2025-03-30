
export const environment = {
    path: {
        database: process.env.DATABASE_PATH || "./data"
    },
    mail: {
        host: process.env.MAIL_HOST || "localhost",
        port: parseInt(process.env.MAIL_PORT || "25"),
        from: process.env.MAIL_FROM || "noreply@localhost",
        recipient: process.env.MAIL_RECIPIENT,
    }
}
