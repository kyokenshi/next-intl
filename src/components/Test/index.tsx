import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Mark, mergeAttributes } from "@tiptap/core";

// Định nghĩa kiểu dữ liệu cho lỗi từ
interface ErrorWord {
    index: number;
    word: string;
    revised: string;
    id: string;
}

// Định nghĩa kiểu dữ liệu cho `data`
interface EditorData {
    result?: {
        original?: string;
        candidates?: { revised_words?: ErrorWord[] }[];
    }[];
}

// Custom Highlight Mark
const Highlight = Mark.create({
    name: "highlight",
    addAttributes() {
        return {
            color: { default: "yellow" },
            originalWord: { default: "" },
            correctedWord: { default: "" },
            originalID: { default: "" },
        };
    },
    parseHTML() {
        return [
            {
                tag: "mark",
                getAttrs: (dom: HTMLElement) => ({
                    color: dom.getAttribute("color"),
                    originalWord: dom.getAttribute("data-original-word"),
                    correctedWord: dom.getAttribute("data-corrected-word"),
                    originalID: dom.getAttribute("data-original-id"),
                }),
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ["mark", mergeAttributes(HTMLAttributes), 0];
    },
});

// Định nghĩa Props cho Component
interface TiptapEditorProps {
    data: EditorData;
    setEditor: (editor: Editor | null) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ data, setEditor }) => {
    const errors: ErrorWord[] = data?.result?.[0]?.candidates?.[0]?.revised_words || [];
    const originalText = data?.result?.[0]?.original || "";
    const words = originalText.split(" ");

    // Tạo nội dung có đánh dấu lỗi
    const content = words
        .map((word, index) => {
            const error = errors.find((err) => err.index === index);
            if (error) {
                return `<mark 
                    color="yellow"
                    data-original-word="${error.word}"
                    data-corrected-word="${error.revised}"
                    data-original-id="${error.id}"
                >${error.word}</mark>`;
            }
            return word;
        })
        .join(" ");

    // Khởi tạo editor
    const editor = useEditor({
        extensions: [StarterKit, Highlight],
        content: `<p>${content}</p>`,
        editorProps: {
            handleKeyDown: (view, event) => {
                const { from } = view.state.selection;
                if (event.key === " " || event.key === "Space") {
                    const transaction = view.state.tr;
                    const nodeBeforeCursor = view.state.doc.nodeAt(from - 1);

                    if (nodeBeforeCursor?.marks.some(mark => mark.type.name === "highlight")) {
                        event.preventDefault();
                        // Chèn dấu cách
                        transaction.insertText(" ", from);
                        // Xóa highlight sau dấu cách (từ mới sẽ không có highlight)
                        transaction.removeMark(from, from + 1, editor && editor.schema.marks.highlight);
                        // Áp dụng thay đổi
                        view.dispatch(transaction);
                        return true;
                    }
                }
                return false;
            },
        },
    });

    useEffect(() => {
        if (editor) setEditor(editor);
    }, [editor, setEditor]);

    return <EditorContent editor={editor} />;
};

export default TiptapEditor;
