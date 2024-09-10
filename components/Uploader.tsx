'use client'

import { useState, useCallback, ChangeEvent } from 'react'
import toast from 'react-hot-toast'

export default function Uploader({ onFileSelect }: { onFileSelect: (file: File | null) => void }) {
  const [data, setData] = useState<{
    filePreview: string | null
    fileType: 'image' | 'text' | null
  }>({
    filePreview: null,
    fileType: null,
  })
  const [file, setFile] = useState<File | null>(null)

  const onChangeFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error('File size too big (max 50MB)')
        } else {
          setFile(file)
          onFileSelect(file) // Pass the file to the parent form
          if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
              setData({ filePreview: e.target?.result as string, fileType: 'image' })
            }
            reader.readAsDataURL(file)
          } else if (file.type === 'text/plain') {
            const reader = new FileReader()
            reader.onload = (e) => {
              setData({ filePreview: e.target?.result as string, fileType: 'text' })
            }
            reader.readAsText(file)
          } else {
            setData({ filePreview: null, fileType: null })
          }
        }
      }
    },
    [onFileSelect]
  )

  return (
    <div className="grid gap-6">
      <div>
        {/* <div className="space-y-1 mb-4">
          <p className="text-sm text-gray-500">
            Accepted formats: .png, .jpg, .gif, .mp4, .txt, .pdf
          </p>
        </div> */}
        <label
          htmlFor="file-upload"
          className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-surface-600 dark:bg-surface-dark-300 shadow-sm transition-all"
        >
          <input
            id="file-upload"
            name="file"
            type="file"
            accept=".png,.jpg,.gif,.mp4,.txt,.pdf"
            className="sr-only"
            onChange={onChangeFile}
          />
          <div
            className={`absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
              data.filePreview
                ? 'bg-surface-600/80 dark:bg-surface-dark-300/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
                : 'bg-surface-600 dark:bg-surface-dark-300 opacity-100'
            }`}
          >
            <svg
              className="h-7 w-7 icon transition-all duration-75 group-hover:scale-110 group-active:scale-95"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p className="mt-2 text-center text-sm text-light">
              Drag and drop or click to upload.
            </p>
            <p className="mt-2 text-center text-sm text-light">
              Max file size: 50MB
            </p>
            <span className="sr-only">File upload</span>
          </div>
          {data.filePreview && data.fileType === 'image' && (
            <img
              src={data.filePreview}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )}
          {data.filePreview && data.fileType === 'text' && (
            <textarea
              value={data.filePreview}
              readOnly
              className="h-full w-full rounded-md border border-gray-300 p-2 text-sm text-gray-800"
            />
          )}
        </label>
      </div>
    </div>
  )
}
