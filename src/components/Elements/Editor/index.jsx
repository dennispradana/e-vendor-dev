import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
} from 'react-icons/fa';
import './editor.css';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="mx-3 mt-2">
      <div className="menuBar">
        <div className="flex items-center gap-3">
          <div>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is_active' : ''}
              type="button"
            >
              <FaBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is_active' : ''}
              type="button"
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'is_active' : ''}
              type="button"
            >
              <FaUnderline />
            </button>
          </div>
          <div>
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={
                editor.isActive({ textAlign: 'left' }) ? 'is_active' : ''
              }
              type="button"
            >
              <FaAlignLeft />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
              className={
                editor.isActive({ textAlign: 'center' }) ? 'is_active' : ''
              }
              type="button"
            >
              <FaAlignCenter />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={
                editor.isActive({ textAlign: 'right' }) ? 'is_active' : ''
              }
              type="button"
            >
              <FaAlignRight />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign('justify').run()
              }
              className={
                editor.isActive({ textAlign: 'justify' }) ? 'is_active' : ''
              }
              type="button"
            >
              <FaAlignJustify />
            </button>
          </div>
          <div>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is_active' : ''}
              type="button"
            >
              <FaStrikethrough />
            </button>
          </div>
          <div>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive('heading', { level: 2 }) ? 'is_active' : ''
              }
              type="button"
            >
              <FaHeading />
            </button>
          </div>
          <div>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is_active' : ''}
              type="button"
            >
              <FaListUl />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is_active' : ''}
              type="button"
            >
              <FaListOl />
            </button>
          </div>
          <div>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is_active' : ''}
              type="button"
            >
              <FaQuoteLeft />
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            type="button"
          >
            <FaUndo />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            type="button"
          >
            <FaRedo />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Tiptap = ({ desc, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'list-disc',
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: 'list-decimal',
          },
        },
        heading: {
          levels: [2],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: `${desc}`,
    editorProps: {
      attributes: {
        class:
          'rounded border min-h-[150px] p-2 border-gray-300  focus:ring-sky-600 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:border-transparent',
      },
    },

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  return (
    <div className="border rounded">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
