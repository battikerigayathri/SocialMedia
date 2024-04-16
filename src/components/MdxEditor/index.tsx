'use client'
import { useEffect, useState, type ForwardedRef } from 'react'
import '@mdxeditor/editor/style.css'
import {
    imageUploadHandler$,
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
import ImageSelector from '@/container/creatBlog/ImageSelector'

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
        imagePlugin({
            disableImageSettingsButton: true,
            ImageDialog: () => {
                const [openSelect, setOpenSelect] = useState(false);
                const [selectedAssetId, setSelectedAssetId] = useState("");
                useEffect(()=>{
                    console.log(selectedAssetId);
                    
                }, [selectedAssetId])

                return (
                    <div className=''>
                        <button type='button' onClick={() => setOpenSelect(true)}>Open Images</button>
                        {openSelect && <ImageSelector setOpenSelect={setOpenSelect} selectedAssetId='' setSelectedAssetId={setOpenSelect} />}
                    </div>
                )
            }
        }),
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
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'Hello **world**!' }),
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
            contentEditableClassName='prose'
            ref={editorRef}
        />
    )
}