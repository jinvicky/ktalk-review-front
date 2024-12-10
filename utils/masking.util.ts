class TailMasking {

    static shortMasking(username: string, displayLength: number): string {
        if (username.length <= 2) {
            return username.slice(0, 1) + "*".repeat(displayLength - 1);
        }
        return username.slice(0, 2) + "*".repeat(displayLength - 2);
    }

    static longMasking(username: string, displayLength: number): string {
        return username.slice(0, 3) + "*".repeat(displayLength - 3);
    }
}


export { TailMasking };