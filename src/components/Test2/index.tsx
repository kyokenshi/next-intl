"use client";
import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import TiptapEditor from "../Test";

const Test2: React.FC = () => {
    const [editor, setEditor] = useState<Editor | null>(null);
    const [data] = useState({
        code: "0000",
        message: "Success",
        result: [
            {
                candidates: [
                    {
                        revised_sentence: "Viết đã sai chính tả.",
                        revised_words: [
                            {
                                id: "1112",
                                err_type: "R:SPELL",
                                err_type_conv: "Spelling error",
                                index: 1,
                                reasoning: "Check for spelling errors.",
                                revised: "đã",
                                type: "sub",
                                word: "dã",
                            },
                            {
                                id: "1113",
                                err_type: "R:SPELL",
                                err_type_conv: "Spelling error",
                                index: 4,
                                reasoning: "Check for spelling errors.",
                                revised: "tả.",
                                type: "sub",
                                word: "tã",
                            },
                        ],
                    },
                ],
                original: "Viết dã sai chính tã",
            },
        ],
    });

    const replaceTextById = (originalId: string) => {
        if (!editor) return;
        // Lấy nội dung HTML hiện tại từ editor
        const currentContent = editor.getHTML();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = currentContent;

        // Tìm tất cả các thẻ <mark>
        tempDiv.querySelectorAll("mark").forEach((mark) => {
            if (mark.getAttribute("originalid") === originalId) {
                const correctedWord = mark.getAttribute("correctedword") || "";
                mark.replaceWith(correctedWord);
            }
        });

        // Cập nhật nội dung vào editor
        editor.commands.setContent(tempDiv.innerHTML);
    };

    const removeHighlightById = (originalId: string) => {
        if (!editor) return;
        // Lấy nội dung HTML hiện tại từ editor
        const currentContent = editor.getHTML();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = currentContent;

        // Tìm tất cả các thẻ <mark>
        tempDiv.querySelectorAll("mark").forEach((mark) => {
            if (mark.getAttribute("originalid") === originalId) {
                const textContent = mark.textContent || ""; // Lấy nội dung bên trong <mark>
                mark.replaceWith(textContent); // Thay thế <mark> bằng chính nội dung bên trong nó
            }
        });
        // Cập nhật nội dung vào editor
        editor.commands.setContent(tempDiv.innerHTML);
    };


    return (
        <div className="grid grid-cols-2 gap-6">
            <TiptapEditor data={data} setEditor={setEditor} />

            <div>
                {data.result[0].candidates.map((item, index) => (
                    <div key={index}>
                        {item.revised_words.map((el, index1) => (
                            <div key={index1} className="mb-10">
                                <span style={{ color: "red" }}>{el.word}</span> - {el.revised}
                                <div className="flex gap-6">
                                    <button onClick={() => replaceTextById(el.id)}>Thay Đổi</button>
                                    <button style={{ color: "red" }} onClick={() => removeHighlightById(el.id)}>Hủy</button>

                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Test2;