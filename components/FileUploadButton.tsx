
interface FileUploadButtonProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFileList?: (FileList: FileList | null) => void;
}

const FileUploadButton = ({ onChange, onFileList }: FileUploadButtonProps) => {

    const innerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        if (e.target.files) {
            onFileList && onFileList(e.target.files);
        }
    }

    return <>
        <input
            type="file"
            id="file-upload"
            multiple
            onChange={(e) => innerFileChange(e)}
            hidden
        />
        <label htmlFor="file-upload">
            <div className="w-full bg-violet-500 hover:bg-violet-700 text-white text-center font-bold my-5 py-2 px-4 rounded">
                파일 선택
            </div>
        </label>
    </>
}

export default FileUploadButton;