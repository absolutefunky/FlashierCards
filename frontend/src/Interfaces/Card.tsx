export default interface Card {
    text: {
        input: string,
        width: number,
        x: number,
        y: number,
        fontSize: number,
        color: string
    }[],
    gif: {
        url: string,
        width: number,
        height: number,
        x: number,
        y: number
    }[],
    sticker: {
        url: string,
        width: number,
        height: number,
        x: number,
        y: number
    }[]
}