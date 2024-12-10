class TailMasking {

    static shortMasking(username: string, displayLength: number): string {
        // JVK:: TODO:: 추후 신청서에서 username을 변경하거나 삭제 필요
        if(username.includes("걍진")) return "익명";
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