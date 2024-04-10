"use client"
import React, { useEffect, useRef, useState } from 'react'
import * as ReactDOM from "react-dom";
import {
    TreeView, TreeViewDragClue, processTreeViewItems,
    moveTreeViewItem, TreeViewDragAnalyzer, TreeViewItemDragOverEvent, TreeViewItemDragEndEvent, TreeViewItemClickEvent, TreeViewCheckChangeEvent
} from '@progress/kendo-react-treeview';
import '@progress/kendo-theme-default/dist/all.css';
import { useLazyQuery } from '@/hook';
import { serverFetch } from '@/action';

const DragDropCategoriesContainer = () => {
    const dragClue = useRef<any>();
    const dragOverCnt = useRef<number>(0);
    const isDragDrop = useRef<boolean>(false);
    const [tree, setTree] = useState<TreeViewDataItem[]>(treeData);
    const [expand, setExpand] = useState({ ids: [], idField: 'text' });
    const [selected, setSelected] = useState({ ids: [], idField: 'text' });
    const [getCategories, { data, loading, error }] = useLazyQuery(serverFetch);

    useEffect(() => {
        getCategories(
            `query ListCategorys {
                listCategorys {
                  docs {
                    id
                    name
                    status
                    subCategory {
                      id
                      name
                      status
                      subCategory {
                        id
                        name
                        status
                        createdOn
                        updatedOn
                      }
                      createdOn
                      updatedOn
                    }
                    createdOn
                    updatedOn
                  }
                }
              }`,
            {},
            {
                cache: "no-store"
            }
        )
    }, [])


    useEffect(() => {
        if (data && data?.listCategorys?.docs) {
            const category: TreeViewDataItem[] = getTreeData(data?.listCategorys?.docs);
            console.log(category);
            setTree(category)
        }
    }, [data, loading, error])

    useEffect(()=>{
        console.log(tree);
        
    }, [tree])
    function getTreeData(categories: any[]): TreeViewDataItem[] {

        return categories?.map((cat: any): any => {
            const treeData: TreeViewDataItem = {
                text: cat.name,
                id: cat.id,
                expanded: true,
            }
            treeData.items = cat?.subCategory?.length > 0 ? getTreeData(cat?.subCategory) : undefined;
            return treeData;
        })
    }

    // function getTreeData(categories: any[], seenIds: Set<string> = new Set()): TreeViewDataItem[] {
    //     return categories.reduce((acc: TreeViewDataItem[], cat: any) => {
    //         if (!seenIds.has(cat.id)) {
    //             seenIds.add(cat.id);
    //             const treeData: TreeViewDataItem = {
    //                 text: cat.name, 
    //                 id: cat.id,
    //                 expanded: true,
    //             };
    //             treeData.items = cat.subCategory?.length > 0 ? getTreeData(cat.subCategory, seenIds) : undefined;
    //             acc.push(treeData);
    //         }
    //         return acc;
    //     }, []);
    // }


    const getClueClassName = (event: any) => {
        const eventAnalyzer = new TreeViewDragAnalyzer(event).init();
        const { itemHierarchicalIndex: itemIndex } = eventAnalyzer.destinationMeta;

        if (eventAnalyzer.isDropAllowed) {
            switch (eventAnalyzer.getDropOperation()) {
                case 'child':
                    return 'k-i-plus';
                case 'before':
                    return itemIndex === '0' || itemIndex.endsWith(`${SEPARATOR}0`) ?
                        'k-i-insert-up' : 'k-i-insert-middle';
                case 'after':
                    const siblings = getSiblings(itemIndex, tree);
                    const lastIndex = Number(itemIndex.split(SEPARATOR).pop());

                    return lastIndex < siblings.length - 1 ? 'k-i-insert-middle' : 'k-i-insert-down';
                default:
                    break;
            }
        }

        return 'k-i-cancel';
    }
    const onItemDragOver = (event: TreeViewItemDragOverEvent) => {
        dragOverCnt.current++;
        dragClue.current.show(event.pageY + 10, event.pageX, event.item.text, getClueClassName(event));
    }

    const onItemDragEnd = (event: TreeViewItemDragEndEvent) => {
        isDragDrop.current = dragOverCnt.current > 0;
        dragOverCnt.current = 0;
        dragClue.current.hide();

        const eventAnalyzer = new TreeViewDragAnalyzer(event).init();

        if (eventAnalyzer.isDropAllowed) {
            const updatedTree: any = moveTreeViewItem(
                event.itemHierarchicalIndex,
                tree,
                eventAnalyzer.getDropOperation() || 'child',
                eventAnalyzer.destinationMeta.itemHierarchicalIndex
            );
            setTree(updatedTree);
        }
    }
    const onItemClick = (event: TreeViewItemClickEvent) => {
        if (!isDragDrop.current) {
            let ids: any = selected.ids.slice();
            const index = ids.indexOf(event.item.id);

            index === -1 ? ids.push(event.item.id) : ids.splice(index, 1);
            setSelected({ ids, idField: 'id' });
        }
    }
    const onExpandChange = (event: TreeViewCheckChangeEvent) => {
        let ids: any = expand.ids.slice();
        const index = ids.indexOf(event.item.text);

        index === -1 ? ids.push(event.item.text) : ids.splice(index, 1);
        setExpand({ ids, idField: 'text' });
    }

    function handleSaveTree() {
        
    }

    return (
        <div>
            <TreeView
                draggable={true} onItemDragOver={onItemDragOver} onItemDragEnd={onItemDragEnd}
                data={processTreeViewItems(
                    tree, { expand: expand, select: selected }
                )}
                expandIcons={true} onExpandChange={onExpandChange} onItemClick={onItemClick}
            />
            <TreeViewDragClue ref={dragClue} />

            <div className='mt-4'>
                <button className='bg-blue-800 text-white px-6 py-1.5 rounded-lg' onClick={handleSaveTree}>Save</button>
            </div>
        </div>
    );
}


export default DragDropCategoriesContainer



interface TreeViewDataItem {
    text: string,
    id: string,
    expanded?: boolean,
    checked?: boolean,
    selected?: boolean,
    items?: TreeViewDataItem[]
}

function getSiblings(itemIndex: string, data: TreeViewDataItem[]) {
    let result = data;

    const indices = itemIndex.split(SEPARATOR).map(index => Number(index));
    for (let i = 0; i < indices.length - 1; i++) {
        result = result[indices[i]].items || [];
    }

    return result;
}

const SEPARATOR = '_';
const treeData: TreeViewDataItem[] = [{
    text: 'Loading...', expanded: true, id: "123"
}
];
