"use client"
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Mark, mergeAttributes } from "@tiptap/core";

// Tạo extension để highlight lỗi chính tả
const Highlight = Mark.create({
    name: "highlight",
    addAttributes() {
        return {
            color: { default: "yellow" }, // Mặc định bôi vàng
        };
    },
    parseHTML() {
        return [{ tag: "mark" }];
    },
    renderHTML({ HTMLAttributes }) {
        return ["mark", mergeAttributes(HTMLAttributes), 0];
    },
});

const TiptapEditor = ({ data }) => {
    const errors = data?.result?.[0]?.candidates?.[0]?.revised_words || [];
    // Lấy văn bản gốc và chèn tag <mark> vào từ bị lỗi
    const initialContent = data?.result?.[0]?.original || "";
    let words = initialContent.split(" ");
    // Duyệt từng từ, nếu có trong danh sách lỗi thì bọc trong <mark>
    words = words.map((word, index) => {
        const error = errors.find((err) => err.index === index);
        if (error) {
            return `<mark>${word}</mark>`; // Bôi vàng từ bị lỗi
        }
        return word;
    });

    const editor = useEditor({
        extensions: [StarterKit, Highlight],
        content: words.join(" "), // Dùng nội dung đã highlight
        onUpdate: ({ editor }) => {
            let content = editor.getHTML(); // Lấy nội dung đã chỉnh sửa
            console.log("Updated content:", content);
        },
    });

    // Xử lý sự kiện khi nhấn phím
    const handleKeyDown = (event) => {
        if (!editor) return;
        if ((event.key === "Enter" && event.shiftKey)) {
            event.preventDefault();
            // Lấy nội dung hiện tại
            const content = editor.getHTML();
            // Loại bỏ <mark> nếu có trong từ cuối cùng
            let updatedContent = content.replace(/<mark>([^<]+)<\/mark>$/, "$1");
            // Cập nhật lại nội dung trong editor
            editor.commands.setContent(updatedContent);
        }
    };

    return <EditorContent editor={editor} onKeyDown={handleKeyDown} />;
};

export default TiptapEditor;