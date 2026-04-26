export default interface Card {
    text: {
        input: string,
        width: number,
        x: number,
        y: number,
        fontSize: number
    }[],
    sticker: {
        name: string,
        x: number,
        y: number
    }[]
}