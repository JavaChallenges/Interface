import hljs from "highlight.js";

export function errorHighlight(code: string, highlightedLines?: number[] | undefined) {
    const highlighted = hljs.highlight(code, {language: 'java'});
    const openTags: string[] = [];
    highlighted.value = highlighted.value.replace(/(<span [^>]+>)|(<\/span>)|(\n)/g, match => {
        if (match === "\n") {
            return "</span>".repeat(openTags.length) + "\n" + openTags.join("");
        }

        if (match === "</span>") {
            openTags.pop();
        } else {
            openTags.push(match);
        }
        return match;
    });
    highlighted.value.split("\n").forEach((line, index) => {
        if(highlightedLines?.includes(index)) {
            highlighted.value = highlighted.value.replace(line, `<span class="line-highlight">${line}</span>`);
        }
    })
    return highlighted.value;
}