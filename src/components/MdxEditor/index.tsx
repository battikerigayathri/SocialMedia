'use client'
import { useEffect, useState, type ForwardedRef } from 'react'
import {
    type MDXEditorMethods,
    type MDXEditorProps
} from '@mdxeditor/editor'
import { FcAddImage } from "react-icons/fc";
import '@mdxeditor/editor/style.css'


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
    getAssetPath,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null, getAssetPath: Function } & MDXEditorProps) {



    const pluginOptions = [
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({
            disableImageSettingsButton: true,
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

            toolbarContents: () => {
                const [openSelect, setOpenSelect] = useState(false);
                const [selectedAssetId, setSelectedAssetId] = useState("");
                useEffect(() => {
                    getAssetPath(selectedAssetId);
                }, [selectedAssetId])
                return (
                    <>
                        <KitchenSinkToolbar />
                        <div className=''>
                            <button type='button' onClick={() => setOpenSelect(true)} className='py-1' title='custom image select'><FcAddImage size={25} /></button>
                            {openSelect && <ImageSelector setOpenSelect={setOpenSelect} selectedAssetId={selectedAssetId} setSelectedAssetId={setSelectedAssetId} />}
                        </div>

                    </>
                )

            }
        }))
    }

    return (
        <div className='prose w-screen'>

            <MDXEditor
                plugins={pluginOptions}
                {...props}
                ref={editorRef}
            />
        </div>
    )
}