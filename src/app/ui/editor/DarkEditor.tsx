import Editor from "react-simple-code-editor";
import hljs from 'highlight.js';
import 'highlight.js/styles/nord.css';
import java from 'highlight.js/lib/languages/java';
import {errorHighlight} from "@/app/ui/editor/actions";
hljs.registerLanguage('java', java);

export default function DarkEditor({template, code, setCode, highlightedLines}: {
    highlightedLines?: {[key: string]: number[]} ,
    template:{title: string; content: string; classname: string;},
    code: string, setCode: (code: (prevCode: any) => any) => void
}) {
    return (
        <Editor
            className={
                "border-2 rounded-md mt-3 " +
                "border-primary-50 bg-lightShades-200 " +
                "dark:bg-darkShades-200"
            }
            // lineHighlight={state.statuscode === 0 ? "1" : state.statuscode === 2 ? "2" : state.statuscode === 3 ? "3" : "4"}
            value={code}
            onValueChange={newCode => setCode(prevCode => ({
                ...prevCode,
                [template.classname]: newCode
            }))}
            highlight={code => {
                return errorHighlight(code, highlightedLines?.[template.classname] || []);
            }}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
            }}
        />
    )
}