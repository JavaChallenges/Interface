import hljs from "highlight.js";

/**
 * Highlights code and wraps specified lines with a line-highlight class.
 *
 * @param {string} code - The code to highlight.
 * @param {number[]} [highlightedLines] - The lines to wrap with the line-highlight class.
 * @returns {string} - The highlighted code with specified lines wrapped.
 */
export function errorHighlight(code: string, highlightedLines?: number[] | undefined): string {
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