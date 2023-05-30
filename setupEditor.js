import { EditorState, basicSetup } from "@codemirror/basic-setup";
import {defaultTabBinding} from "@codemirror/commands";
import { EditorView, keymap } from "@codemirror/view";
import { json } from "@codemirror/lang-json";

export default function setupEditors(){
    const jsonRequestBody = document.querySelector('[data-json-request-body]');
    const jsonResponseBody = document.querySelector('[data-json-response-body]');

    const basicExtensions = [
        basicSetup,
        keymap.of([defaultTabBinding]),
        json(),
        EditorState.tabSize.of(2)
    ]

    const responseEditor = new EditorView({
        state: EditorState.create({
            doc: '{}',
            extensions: [...basicExtensions, EditorView.editable.of(false)]
        }),
        parent: jsonResponseBody
    })

        const requestEditor = new EditorView({
        state: EditorState.create({
            doc: '{\n\t\n}',
            extensions: basicExtensions
        }),
        parent: jsonRequestBody
    })

    function updateResponseEditor(value) {
        responseEditor.dispatch({
            changes: {
                from: 0,
                to: responseEditor.state.doc.length,
                insert: JSON.stringify(value, null, 2)
            }
        })
    }


    return {requestEditor, updateResponseEditor};
}