import React, { useMemo, useState }  from "react";
import { BaseEditor, createEditor, Descendant } from "slate";
import { ReactEditor, Slate, withReact, Editable } from "slate-react";

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText =  { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export default function TextEditor() {


    const editor = useMemo(() => withReact(createEditor()), []);

    const initialValue: CustomElement[] = []
    const [value, setValue] = useState<Descendant[]>(initialValue)
    
    return (
        <div>
            <Slate value={value} onChange={newValue => setValue(newValue)} editor={editor}>
                <Editable/>
            </Slate>
        </div>
    );
}

