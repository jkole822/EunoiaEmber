import { FileUpload } from '@ark-ui/svelte/file-upload';

export interface Props {
allowDrop?: boolean;
capture?: 'user' | 'environment';
directory?: boolean;
disabled?: boolean;
id?: string;
locale?: string;
name?: string;
onFileAccept?: (details: FileUpload.FileAcceptDetails) => void;
onFileChange?: (details: FileUpload.FileChangeDetails) => void;
onFileReject?: (details: FileUpload.FileRejectDetails) => void;
preventDocumentDrop?: boolean;
required?: boolean;
transformFiles?: (files: File[]) => Promise<File[]>;
}