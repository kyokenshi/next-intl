"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, KeyboardEvent } from "react";
import Highlight from "./Highlight";

interface RevisedWord {
    id: string;
    index: string | number;
    revised: string;
    word: string;
    indexes?: number[];
}

interface ApiResponse {
    code: string;
    message: string;
    result: {
        original: string;
        revised_words: RevisedWord[];
    };
}

interface CheckSpellProps {
    setEditor: (editor: Editor | null) => void;
    data: ApiResponse;
}

const preprocessData = (data: ApiResponse) => {
    if (!data) {
        return null
    }
    const words = data?.result?.original.match(/\S+|\n/g) || [];

    const revisedWords = data?.result?.revised_words.map((err) => {
        let indexes: number[] = [];
        if (typeof err.index === "string" && err.index.includes("-")) {
            const [start, end] = err.index.split("-").map(Number);
            indexes = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        } else {
            indexes = [Number(err.index)];
        }
        return { ...err, indexes };
    });
    console.log(revisedWords, "revisedWords");
    return { words, revisedWords };
};
// const formatContent = ({ words, revisedWords }: { words: string[]; revisedWords: RevisedWord[] }) => {
//     let formattedText = "";
//     let insideMark = false;
//     let currentError: RevisedWord | null = null;

//     words.forEach((word, index) => {
//         if (word === "\n") {
//             formattedText += "<br />";
//             return;
//         }

//         const error = revisedWords.find((err) => err.indexes?.includes(index));

//         if (error) {
//             if (!insideMark) {
//                 formattedText += `<mark data-original-word="${error.word}" data-corrected-word="${error.revised}" data-original-id="${error.id}">`;
//                 insideMark = true;
//                 currentError = error;
//             }
//             formattedText += word; // Bọc cả dấu cách giữa các từ lỗi
//         } else {
//             if (insideMark) {
//                 formattedText += "</mark>"; // Đóng `<mark>` trước khi thêm từ bình thường
//                 insideMark = false;
//                 currentError = null;
//             }
//             formattedText += word;
//         }

//         // ✅ Fix lỗi dư dấu cách trong `<mark>`
//         const isNextError = revisedWords.some((err) => err.indexes?.includes(index + 1));

//         // 🔥 Chỉ thêm dấu cách nếu:
//         // 1. Từ tiếp theo không phải xuống dòng
//         // 2. Nếu đang trong `<mark>`, chỉ thêm dấu cách nếu từ tiếp theo cũng bị lỗi
//         if (index < words.length - 1 && words[index + 1] !== "\n") {
//             if (insideMark && isNextError) {
//                 formattedText += " "; // Thêm dấu cách giữa các từ trong `<mark>`
//             } else if (!insideMark) {
//                 formattedText += " "; // Thêm dấu cách ngoài `<mark>`
//             }
//         }
//     });

//     if (insideMark) {
//         formattedText += "</mark>"; // Đảm bảo `<mark>` được đóng đúng cách
//     }

//     return formattedText.trim();
// };



// const handleKeyDown = (event: KeyboardEvent, editor: Editor | null) => {
//     if (event.shiftKey && event.key === "Enter") {
//         event.preventDefault();
//         editor?.commands.setHardBreak();
//     }
// };


const formatContent = ({ words, revisedWords }: { words: string[]; revisedWords: RevisedWord[] }): string => {
    let formattedText = "";
    let insideMark = false;
    let currentError: RevisedWord | null = null;

    words.forEach((word, index) => {
        if (word === "\n") {
            formattedText += "<br />";
            return;
        }

        const error = revisedWords.find(err => err.indexes?.includes(index));
        const isFirstWordInError = error && (!currentError || !currentError.indexes?.includes(index - 1));
        const isLastWordInError = insideMark && (!error || !error.indexes?.includes(index + 1));

        if (error) {
            if (isFirstWordInError) {
                formattedText += `<mark data-original-word="${error.word}" data-corrected-word="${error.revised}" data-original-id="${error.id}">`;
                insideMark = true;
                currentError = error;
            }

            formattedText += isFirstWordInError ? word : ` ${word}`;

            if (isLastWordInError) {
                formattedText += "</mark> ";
                insideMark = false;
                currentError = null;
            }
        } else {
            if (insideMark) {
                formattedText += "</mark> ";
                insideMark = false;
                currentError = null;
            }
            formattedText += word + " ";
        }
    });

    if (insideMark) {
        formattedText += "</mark>";
    }

    return formattedText.trim();
};







const CheckSpell: React.FC<CheckSpellProps> = ({ setEditor, data }) => {

    const processedData = preprocessData(data);
    const words = processedData?.words || [];
    const revisedWords = processedData?.revisedWords || [];


    const content = formatContent({ words, revisedWords });

    const editor = useEditor({
        extensions: [StarterKit, Highlight],
        content,
    });


    useEffect(() => {
        if (editor) {
            setEditor(editor);
        }
    }, [editor, setEditor]);

    return <EditorContent editor={editor} />;
};

export default CheckSpell;