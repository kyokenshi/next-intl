"use client";

import { Mark } from "@tiptap/core";

const Highlight = Mark.create({
    name: "highlight",
    parseHTML() {
        return [
            {
                tag: "mark",
                getAttrs: (dom: HTMLElement) => ({
                    color: dom.getAttribute("color"),
                    class: dom.getAttribute("class"),
                    originalWord: dom.getAttribute("data-original-word"),
                    correctedWord: dom.getAttribute("data-corrected-word"),
                    originalID: dom.getAttribute("data-original-id"),
                }),
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ["mark", HTMLAttributes, 0];
    },
    addAttributes() {
        return {
            color: { default: "yellow" },
            class: { default: "yellow" },
            originalWord: { default: "" },
            correctedWord: { default: "" },
            originalID: { default: "" },
        };
    },
});

export default Highlight;