import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

export const RTE = ({
  content,
  onChange,
}: {
  content?: string;
  onChange: Function;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: content || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="rte-wrapper">
      <EditorContent
        editor={editor}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};
