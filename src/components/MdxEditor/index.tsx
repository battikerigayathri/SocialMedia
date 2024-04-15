'use client'
import type { ForwardedRef } from 'react'
import '@mdxeditor/editor/style.css'
import {
    type MDXEditorMethods,
    type MDXEditorProps
} from '@mdxeditor/editor'

import {
    MDXEditor,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    frontmatterPlugin,
    headingsPlugin,
    imagePlugin,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    sandpackPlugin,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    KitchenSinkToolbar

} from '@mdxeditor/editor'

export default function InitializedMDXEditor({
    editorRef,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {

    const pluginOptions = [
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        sandpackPlugin({
            sandpackConfig: {
                defaultPreset: "Hello world",
                presets: []
            }
        }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        markdownShortcutPlugin()
    ]

    if (!props.readOnly) {
        pluginOptions.push(toolbarPlugin({
            toolbarContents: () => (
                <>
                    <KitchenSinkToolbar />
                </>
            )
        }))
    }
    return (
        <MDXEditor
            plugins={pluginOptions}
            {...props}
            ref={editorRef}
        />
    )
}