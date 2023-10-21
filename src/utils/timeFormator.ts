export const timeConvert = (time: number) => {
    let a: number | string = ~~(time / 3600);
    let b: number | string = ~~(time / 60) - a * 60;
    let c: number | string = time % 60;
 
    a = String(a).padStart(2, "0");
    b = String(b).padStart(2, "0");
    c = String(c).padStart(2, "0");
 
    if (a === '00') {
        return `${b}:${c}`;
    } else
        return `${a}:${b}:${c}`;
    }