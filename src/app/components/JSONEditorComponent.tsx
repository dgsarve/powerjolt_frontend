'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import ResizeObserver from 'resize-observer-polyfill';

interface JSONEditorComponentProps {
    value: string;
    onChange: (content: string) => void;
    errorMessage?: string;
}

const JSONEditorComponent: React.FC<JSONEditorComponentProps> = ({ value, onChange, errorMessage }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const jsonEditorRef = useRef<JSONEditor | null>(null);
    const [editorHeight, setEditorHeight] = useState<number>(256); // Initial height

    // Callback to handle text change in the editor
    const handleChangeText = useCallback((jsonString: string) => {
        onChange(jsonString);
    }, [onChange]);

    // Effect to initialize JSONEditor
    useEffect(() => {
        if (typeof window !== 'undefined' && editorRef.current) {
            jsonEditorRef.current = new JSONEditor(editorRef.current, {
                mode: 'code',
                onChangeText: handleChangeText,
            });

            jsonEditorRef.current.setText(value);

            // Apply inline styles to JSONEditor elements
            const applyCustomStyles = () => {
                const editorElement = editorRef.current?.querySelector('.jsoneditor') as HTMLElement;
                if (editorElement) {
                    editorElement.style.fontSize = '12px'; // Adjust font size
                }
                const contentElements = editorElement?.querySelectorAll('.ace_content') as NodeListOf<HTMLElement>;
                contentElements.forEach(el => {
                    el.style.fontSize = '12px';
                });
            };

            applyCustomStyles();

            const ro = new ResizeObserver(entries => {
                for (let entry of entries) {
                    setEditorHeight(entry.contentRect.height);
                    applyCustomStyles();
                }
            });

            ro.observe(editorRef.current);

            return () => {
                if (jsonEditorRef.current) {
                    jsonEditorRef.current.destroy();
                    jsonEditorRef.current = null;
                }
                ro.disconnect();
            };
        }
    }, [handleChangeText, value]);

    // Effect to update the editor content when the value changes
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
            <div
                ref={editorRef}
                className="flex-grow border rounded p-2"
                style={{ height: editorHeight }}
            />
            {errorMessage && <span className="text-red-500 text-xl mt-2">{errorMessage}</span>}
        </div>
    );
};

export default JSONEditorComponent;
