import React, { useRef, useState } from "react";
import SquareButton from "./SquareButton";
import { FILE_SIZE_LIMIT } from "@/misc/http";

interface FileSelectorInterface extends React.HTMLProps<HTMLInputElement> {
  onFileSelect?: (files: FileList | null) => void; // Callback when files are selected
}

const FileSelector: React.FC<FileSelectorInterface> = ({
  children,
  className,
  onFileSelect,
  ...props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInfo, setFileInfo] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.size > FILE_SIZE_LIMIT) {
        setFileInfo("File too large!");
        return;
      }
      setFileInfo(`Selected: ${file.name}`);
      onFileSelect && onFileSelect(files);
    }
  };
  const clearFile = function () {
    if (!fileInputRef.current) return;
    if (fileInputRef.current.files) fileInputRef.current.value = "";
    setFileInfo(null);
  };
  return (
    <>
      <div className="center">
        <SquareButton
          type="button"
          onClick={handleButtonClick}
          color="var(--color-secondary)"
          className={className ?? "fileInput"}
        >
          {children}
        </SquareButton>
        <SquareButton
          type="button"
          onClick={clearFile}
          color="var(--color-warning)"
          className={className ?? "fileInput"}
        >
          Clear image
        </SquareButton>
      </div>
      <input
        type="file"
        style={{ display: "none" }}
        {...props}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="fileInfo">{fileInfo ?? "No file selected"}</div>
    </>
  );
};

export default FileSelector;
