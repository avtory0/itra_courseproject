import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Description() {
    const handleOnChange = (e, editor) => {
        const data = editor.getData();
        console.log(data);
    }

    return (
        <div className="mb-3">
            <CKEditor editor={ClassicEditor} onChange={handleOnChange} />
        </div>
    )
}
