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
                formattedText += `<mark data-original-word="${error.word}" data-corrected-word="${error.revised}" class="cursor-pointer" data-original-id="${error.id}">`;
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


    const handleMarkClick = (wordId: string) => {
        // Lấy div chứa tất cả phần tử (mottinhiu)
        const container = document.getElementById("mottinhiu");
        if (!container) return;
        // Ẩn tất cả div có class "xinchao" nhưng chỉ trong container
        container.querySelectorAll('[data-type="custom"]').forEach((div) => {
            div.classList.add("hidden");
        });        // Tìm phần tử cha có id tương ứng với wordId bên trong container
        const parentDiv = container.querySelector(`#${CSS.escape(wordId)}`);

        if (!parentDiv) return;
        const targetDiv = parentDiv.querySelector('[data-type="custom"]');
        if (targetDiv) {
            targetDiv.classList.remove("hidden");
        }
    };


    const content = formatContent({ words, revisedWords });

    const editor = useEditor({
        extensions: [StarterKit, Highlight],
        content,
        // editorProps: {

        //     //TH1:  enter thì mất mất shift enter thì còn
        //     handleKeyDown: (view, event) => {
        //         if (event.key === "Enter") {
        //             event.preventDefault();
        //             const { state, dispatch } = view;
        //             const { selection, tr, schema } = state;
        //             const pos = selection.from;
        //             const nodeBefore = state.doc.nodeAt(pos - 1);
        //             const nodeAfter = state.doc.nodeAt(pos);

        //             // Kiểm tra nếu con trỏ đang trong <mark>
        //             const markBefore = nodeBefore?.marks.find(mark => mark.type.name === "highlight");
        //             const markAfter = nodeAfter?.marks.find(mark => mark.type.name === "highlight");

        //             if (markBefore || markAfter) {
        //                 // Xác định phạm vi bỏ highlight
        //                 let markEnd = pos;
        //                 while (markEnd < state.doc.nodeSize - 2) {
        //                     const node = state.doc.nodeAt(markEnd);
        //                     if (!node || !node.marks.some(mark => mark.type.name === "highlight")) break;
        //                     markEnd++;
        //                 }

        //                 // Xóa highlight của phần sau con trỏ
        //                 tr.removeMark(pos, markEnd, schema.marks.highlight);
        //                 dispatch(tr);
        //             }

        //             // Xuống dòng đúng cách mà không bị giữ highlight
        //             if (event.shiftKey) {
        //                 // Shift + Enter -> Xuống dòng mềm (<br>)
        //                 editor?.commands.setHardBreak();
        //             } else {
        //                 // Enter -> Xuống đoạn mới, đảm bảo không giữ highlight
        //                 editor?.commands.splitBlock();
        //                 // Đặt con trỏ ở đoạn mới và chắc chắn đoạn mới không bị highlight
        //                 setTimeout(() => {
        //                     editor?.commands.unsetMark("highlight");
        //                 }, 0);
        //             }

        //             return true;
        //         }
        //         return false;
        //     },
        // },

        /// TH2:  enter và shift enter đều mất TH2
        editorProps: {
            handleKeyDown: (view, event) => {
                if (event.key === "Enter") {
                    event.preventDefault();

                    const { state, dispatch } = view;
                    const { selection, tr, schema } = state;
                    const pos = selection.from;
                    const nodeBefore = state.doc.nodeAt(pos - 1);
                    const nodeAfter = state.doc.nodeAt(pos);

                    // Kiểm tra nếu con trỏ đang trong <mark>
                    const markBefore = nodeBefore?.marks.find(mark => mark.type.name === "highlight");
                    const markAfter = nodeAfter?.marks.find(mark => mark.type.name === "highlight");

                    if (markBefore || markAfter) {
                        // Xác định phạm vi cần bỏ highlight
                        let markEnd = pos;
                        while (markEnd < state.doc.nodeSize - 2) {
                            const node = state.doc.nodeAt(markEnd);
                            if (!node || !node.marks.some(mark => mark.type.name === "highlight")) break;
                            markEnd++;
                        }
                        // Bỏ highlight cho phần sau con trỏ
                        tr.removeMark(pos, markEnd, schema.marks.highlight);
                        dispatch(tr);
                    }

                    if (event.shiftKey) {
                        // Shift + Enter -> Xuống dòng mềm (<br>) + bỏ highlight cho phần sau
                        editor?.commands.setHardBreak();
                        setTimeout(() => {
                            editor?.commands.unsetMark("highlight");
                        }, 0);
                    } else {
                        // Enter -> Xuống đoạn mới + bỏ highlight
                        editor?.commands.splitBlock();
                        setTimeout(() => {
                            editor?.commands.unsetMark("highlight");
                        }, 0);
                    }

                    return true;
                }
                return false;
            },
            handleClick: (view, pos, event) => {
                const target = event.target as HTMLElement;
                if (target.tagName === "MARK") {
                    const wordId = target.getAttribute("originalid");

                    if (wordId) {
                        // Ví dụ: Gọi API hoặc mở popup xử lý từ này
                        handleMarkClick(wordId);
                    }
                }
            },
        },


        // TH3 : 


    });


    useEffect(() => {
        if (editor) {
            setEditor(editor);
        }
    }, [editor, setEditor]);

    return <EditorContent editor={editor} />;
};

export default CheckSpell;