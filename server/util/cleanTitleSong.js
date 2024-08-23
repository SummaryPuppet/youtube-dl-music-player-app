export const clean = (title) => {
    return title
        .trim()
        .replace(/\//g, "")
        .replace(/#/g, "")
        .replace(/\(Video oficial\)/g, "")
        .replace(/\(Video Oficial\)/g, "")
        .replace(/\(Audio\)/g, "")
        .replace(/\(Videoclip Oficial\)/g, "")
        .replace(/\(VIDEOCLIP Oficial\)/g, "")
        .replace(/\(Oficial Music Video\)/g, "")
        .replace(/\(Lyric Video\)/g, "")
        .trim()
}