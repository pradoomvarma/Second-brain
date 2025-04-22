

export function random(len: number) {
    let option = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += option[Math.floor(Math.random() * option.length)];
    }
    return result;
}