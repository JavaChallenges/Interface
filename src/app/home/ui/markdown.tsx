"use client"

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { nord, vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'
import {useTheme} from "next-themes";

export default function RenderedMarkdown({markdown}: { markdown: string }) {
    const {theme} = useTheme();
    const style = theme === "dark" ? nord : vs;
    return (
        <Markdown className={"markdown text-darkShades-100 dark:text-lightShades-100"}
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeRaw, rehypeKatex]}
                  components={{
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      code({ inline, className, children, ...props }: { inline?: boolean, className?: string, children?: React.ReactNode }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                              <SyntaxHighlighter style={style} PreTag="div" language={match[1]} {...props}>
                                  {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                          ) : (
                              <code className={className} {...props}>
                                  {children}
                              </code>
                          );
                      },
                  }}
        >
            {markdown}
        </Markdown>
    )
}