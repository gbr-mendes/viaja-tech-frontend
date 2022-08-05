import { useState } from 'react'
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

export function Marketing() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    return (
        <>
            <div className="d-flex justify-content-center align-itens-center">
                <h1>Marketing Page</h1>
            </div>
            <div className="row">
                <div className="contacts-list col-2">
                    <ul>
                        <li>Lead 1</li>
                        <li>Lead 2</li>
                        <li>Lead 3</li>
                        <li>Lead 4</li>
                        <li>Lead 5</li>
                    </ul>
                </div>
                <div className='col-10 bg-white'>
                    <Editor
                        editorState={editorState}
                        onChange={setEditorState}
                    />
                </div>
            </div>
        </>
    )
}