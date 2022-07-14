export function sleep(t, toReject = false) {
    return new Promise((resolve, reject) => {
        setTimeout(toReject ? reject : resolve, t);
    });
}