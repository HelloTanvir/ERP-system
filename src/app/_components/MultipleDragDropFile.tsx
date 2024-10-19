'use client';

import { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { InputProps } from '../_lib/utils';

const uploadIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
        <path
            d="M24.748 33.7499H29.248V20.2499H35.998L26.998 8.99988L17.998 20.2499H24.748V33.7499Z"
            fill="#682FE6"
        />
        <path
            d="M44.998 40.5001H8.99805V24.7501H4.49805V40.5001C4.49805 42.9819 6.5163 45.0001 8.99805 45.0001H44.998C47.4798 45.0001 49.498 42.9819 49.498 40.5001V24.7501H44.998V40.5001Z"
            fill="#682FE6"
        />
    </svg>
);

const deleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
        <path
            d="M5.8335 18.2075C5.37516 18.2075 4.98266 18.0442 4.656 17.7175C4.32933 17.3909 4.16627 16.9986 4.16683 16.5409V5.70752H3.3335V4.04085H7.50016V3.20752H12.5002V4.04085H16.6668V5.70752H15.8335V16.5409C15.8335 16.9992 15.6702 17.3917 15.3435 17.7184C15.0168 18.045 14.6246 18.2081 14.1668 18.2075H5.8335ZM14.1668 5.70752H5.8335V16.5409H14.1668V5.70752ZM7.50016 14.8742H9.16683V7.37419H7.50016V14.8742ZM10.8335 14.8742H12.5002V7.37419H10.8335V14.8742Z"
            fill="black"
        />
    </svg>
);

function MultipleDragDropFile({ field, error }: Readonly<InputProps>) {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: field.accept,
    });

    const removeFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="font-medium text-gray-600" htmlFor={field.name}>
                {field.label}
            </label>

            <div
                {...getRootProps()}
                className={`mt-1 p-6 border-2 cursor-pointer border-dashed rounded-md relative h-52 flex items-end justify-center ${
                    isDragActive ? 'border-principal bg-blue-50' : 'border-gray-300'
                }`}
            >
                <input
                    {...getInputProps()}
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    value={files}
                />

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {uploadIcon}
                </div>

                <p className="text-center text-[#B5A9A9] text-sm font-light">
                    {isDragActive
                        ? 'Drop the files here...'
                        : 'Drag and drop or upload from your local device'}
                </p>
            </div>

            {files.length > 0 && (
                <ul className="mt-8 flex flex-col gap-2 items-center">
                    {files.map((file, index) => (
                        <li
                            // eslint-disable-next-line react/no-array-index-key
                            key={file.name + index}
                            className="flex items-center justify-between gap-5 w-56"
                        >
                            <span className="text-sm text-gray-700 truncate underline">
                                {file.name}
                            </span>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                {deleteIcon}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {error && (
                <p className="text-red-400 italic font-semibold text-xs mx-2 mt-1">{error}</p>
            )}
        </div>
    );
}

export default MultipleDragDropFile as FC<InputProps>;
