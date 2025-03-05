"use client"

import { Mark } from "@tiptap/core";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


const Highlight = Mark.create({
    name: "highlight",
    parseHTML() {
        return [{ tag: "mark" }];
    },
    renderHTML() {
        return ["mark", 0];
    }
});

const preprocessData = (data) => {
    // 1. Tách văn bản thành mảng từ, dấu câu riêng biệt
    const words = data.result.original.match(/\S+|\n/g) || [];

    // 2. Chuyển đổi index thành mảng số
    const revisedWords = data.result.revised_words.map(err => {
        let indexes = [];
        if (typeof err.index === "string" && err.index.includes("-")) {
            const [start, end] = err.index.split("-").map(Number);
            indexes = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        } else {
            indexes = [Number(err.index)];
        }
        return { ...err, indexes };
    });

    return { words, revisedWords };
};

const formatContent = ({ words, revisedWords }) => {
    return words
        .map((word, index) => {
            if (word === "\n") return "<br />"; // Xử lý xuống dòng
            const isError = revisedWords.some(err => err.indexes.includes(index));
            return isError ? `<mark>${word}</mark>` : word;
        })
        .join(" ");
};



const data = {
    "code": "0000",
    "message": "Success",
    "result": {
        "original": "- Thiết kếê, xây dựng và duy trì hạ tầng CI/CD.\n- Quảnnn lý nguônf và giám sát các hệ thống máy chủ và các ứng dụng trên đám mây.",
        "revised_words": [
            { "id": "1112", "index": 2, "revised": "kế", "word": "kếê" },
            { "id": "1113", "index": "13-15", "revised": "Quản lý nguồn", "word": "Quảnnn lýy nguônf" }
        ]
    }
};

// Xử lý dữ liệu
const { words, revisedWords } = preprocessData(data);
const content = formatContent({ words, revisedWords });

const CheckSpell = () => {
    const editor = useEditor({
        extensions: [StarterKit, Highlight], // Dùng Extension hỗ trợ <mark>
        content,
    });

    return <EditorContent editor={editor} />;
};

export default CheckSpell;