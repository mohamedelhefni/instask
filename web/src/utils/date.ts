export function ReadableDate(date: Date): string {
    return new Date(date).toLocaleString('en-us', { day: 'numeric', month: 'short', hour: "numeric", minute: "numeric" })
}