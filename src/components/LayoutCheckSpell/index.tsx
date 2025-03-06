"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import CheckSpell from "../CheckSpell";

export type RevisedWord = {
    id: string;
    index: any;
    revised: string;
    word: string;
};

export type ResultData = {
    original: string;
    revised_words: RevisedWord[];
};

export type ApiResponse = {
    code: string;
    message: string;
    result: ResultData;
};

const data: ApiResponse = {
    code: "0000",
    message: "Success",
    result: {
        original:
            "- Thiết kếê, xây dựng và duy trì hạ tầng CI/CD.\n- Quảnnn lý nguônf vàa giám sát các hệ thống máy chủ và các ứng dụng trên đám mây.",
        revised_words: [
            { id: "1112", index: 2, revised: "kế", word: "kếê," },
            { id: "1113", index: "13-15", revised: "Quản lý nguồn", word: "Quảnnn lýy nguônf" },
            { id: "1114", index: "16-17", revised: "và giám", word: "vàa giám" },

        ],
    },
};

const LayoutCheckSpell = () => {
    const [editor, setEditor] = useState<Editor | null>(null);

    const replaceTextById = (originalId: string) => {
        if (!editor) return;

        const currentContent = editor.getHTML();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = currentContent;

        tempDiv.querySelectorAll("mark").forEach((mark) => {
            if (mark.getAttribute("originalid") === originalId) {
                const correctedWord = mark.getAttribute("correctedword") || "";
                mark.replaceWith(`${correctedWord + " "}`);
            }
        });

        editor.commands.setContent(tempDiv.innerHTML);
    };

    const removeHighlightById = (originalId: string) => {
        if (!editor) return;

        const currentContent = editor.getHTML();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = currentContent;

        tempDiv.querySelectorAll("mark").forEach((mark) => {
            if (mark.getAttribute("originalid") === originalId) {
                const textContent = mark.textContent || "";
                mark.replaceWith(`${textContent + " "}`);
            }
        });

        editor.commands.setContent(tempDiv.innerHTML);
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            <CheckSpell setEditor={setEditor} data={data} />

            <div>
                {data.result.revised_words.map((el) => (
                    <div key={el.id} className="mb-10">
                        <span style={{ color: "red" }}>{el.word}</span> → {el.revised}
                        <div className="flex gap-6">
                            <button onClick={() => replaceTextById(el.id)}>Thay Đổi</button>
                            <button style={{ color: "red" }} onClick={() => removeHighlightById(el.id)}>
                                Hủy
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LayoutCheckSpell;