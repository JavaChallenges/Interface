import Editor from "react-simple-code-editor";
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';
import java from 'highlight.js/lib/languages/java';
import {errorHighlight} from "@/app/ui/editor/actions";
hljs.registerLanguage('java', java);
export const revalidate = 0;

export default function LightEditor({template, code, setCode, highlightedLines}: {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    highlightedLines?: {[key: string]: number[]} ,
    template:{title: string; content: string; classname: string;},
    code: string, setCode: (code: (prevCode: {[key: string]: string}) => {[key: string]: string}) => void
}) {
    return (
        <Editor
            className={
                "border-2 rounded-md my-3 " +
                "border-primary-50 bg-lightShades-200 " +
                "dark:bg-darkShades-200"
            }
            value={code}
            onValueChange={newCode => setCode(prevCode => ({
                ...prevCode,
                [template.classname]: newCode
            }))}
            highlight={code => {
                return errorHighlight(code, highlightedLines?.[template.classname] || []);
            }}
            onChange={()=>{}}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
            }}
        />
    )
}