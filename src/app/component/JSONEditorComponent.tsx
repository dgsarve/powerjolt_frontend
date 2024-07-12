'use client';
import React, { useEffect, useRef } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

interface JSONEditorComponentProps {
    value: string;
    onChange: (content: string) => void;
    errorMessage?: string;
}

const JSONEditorComponent: React.FC<JSONEditorComponentProps> = ({ value, onChange, errorMessage }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const jsonEditorRef = useRef<JSONEditor | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && editorRef.current) {
            jsonEditorRef.current = new JSONEditor(editorRef.current, {
                mode: 'code',
                onChangeText: (jsonString: string) => {
                    onChange(jsonString);
                }
            });

            jsonEditorRef.current.setText(value);
        }

        return () => {
            if (jsonEditorRef.current) {
                jsonEditorRef.current.destroy();
                jsonEditorRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (jsonEditorRef.current) {
            try {
                jsonEditorRef.current.updateText(value);
            } catch (error) {
                jsonEditorRef.current.setText(value);
            }
        }
    }, [value]);

    return (
        <div className="flex flex-col h-full">
            <div ref={editorRef} className="flex-grow h-64" />
            {errorMessage && <span className="text-red-500 text-xl mt-1">{errorMessage}</span>}
        </div>
    );
};

export default JSONEditorComponent;
