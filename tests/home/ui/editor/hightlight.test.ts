import hljs from "highlight.js";
import {errorHighlight} from "@/app/home/ui/editor/highlight";

jest.mock("highlight.js", () => ({
    highlight: jest.fn()
}));

describe('errorHighlight', () => {
    it('should highlight code and wrap specified lines with line-highlight class', () => {
        const code = 'public class Test {}';
        const highlightedLines = [0];
        (hljs.highlight as jest.Mock).mockReturnValue({ value: '<span>public class Test {}</span>' });

        const result = errorHighlight(code, highlightedLines);

        expect(result).toContain('<span class="line-highlight"><span>public class Test {}</span></span>');
    });

    it('should handle code without specified lines to highlight', () => {
        const code = 'public class Test {}';
        (hljs.highlight as jest.Mock).mockReturnValue({ value: '<span>public class Test {}</span>' });

        const result = errorHighlight(code);

        expect(result).toBe('<span>public class Test {}</span>');
    });

    it('should handle code with no matching tags to close', () => {
        const code = 'public class Test {}';
        (hljs.highlight as jest.Mock).mockReturnValue({ value: 'public class Test {}' });

        const result = errorHighlight(code);

        expect(result).toBe('public class Test {}');
    });

    it('should handle code with nested tags correctly', () => {
        const code = 'public class Test {}';
        (hljs.highlight as jest.Mock).mockReturnValue({ value: '<span><span>public class Test {}</span></span>' });

        const result = errorHighlight(code);

        expect(result).toBe('<span><span>public class Test {}</span></span>');
    });
});