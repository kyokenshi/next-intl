import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Mark, mergeAttributes } from "@tiptap/core";


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
                getAttrs: (dom: any) => ({
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


interface TiptapEditorProps {
    data: any;
    setEditor: (editor: Editor | null) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ data, setEditor }) => {
    const errors = data?.result?.[0]?.candidates?.[0]?.revised_words || [];
    let originalText = data?.result?.[0]?.original || "";
    let words = originalText.split(" ");

    // Tạo nội dung có đánh dấu lỗi
    const content = words
        .map((word, index) => {
            const error = errors.find((err) => err.index === index);
            if (error) {
                console.log(error.word, "error.word");
                console.log(error.revised, "error.revised");

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
                if (event.shiftKey && event.key === "Enter") {
                    event.preventDefault(); // Chặn hành động mặc định
                    // Xuống dòng bằng cách thoát khỏi thẻ <mark>
                    editor?.commands.exitCode(); // Thoát khỏi thẻ hiện tại (nếu có)
                    editor?.commands.insertContent("<br>"); // Thêm <br> để xuống dòng
                    return true;
                }
                if (!event.shiftKey && event.key === "Enter") {
                    event.preventDefault(); // Chặn hành động mặc định
                    editor?.commands.exitCode(); // Thoát khỏi thẻ <mark>
                    editor?.commands.insertContent("<p></p>"); // Tạo đoạn mới
                    return true;
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