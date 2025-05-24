"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ImageUploaderProps {
  maxSize?: number; // in bytes, default 5MB
  className?: string;
  onImageChange?: (file: File | null) => void;
  acceptedFileTypes?: string[];
}

export function ImageUploader({
  maxSize = 5 * 1024 * 1024, // 5MB default
  className,
  onImageChange,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
}: ImageUploaderProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      setSuccess(null);

      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];

      // File type validation
      if (!acceptedFileTypes.includes(file.type)) {
        setError(`Invalid file type. Please upload ${acceptedFileTypes.join(", ")}`);
        return;
      }

      // File size validation
      if (file.size > maxSize) {
        setError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImage(file);
      setPreview(previewUrl);
      setSuccess("File uploaded successfully!");

      if (onImageChange) {
        onImageChange(file);
      }
    },
    [acceptedFileTypes, maxSize, onImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: false,
    onDropRejected: (fileRejections) => {
      if (fileRejections.length > 0) {
        const { errors } = fileRejections[0];
        
        if (errors[0]?.code === 'file-too-large') {
          setError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
        } else if (errors[0]?.code === 'file-invalid-type') {
          setError(`Invalid file type. Please upload ${acceptedFileTypes.map(type => type.replace("image/", "")).join(", ")}`);
        } else {
          setError(`Error: ${errors[0]?.message || 'Invalid file'}`);
        }
      }
    }
  });

  const clearImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setImage(null);
    setPreview(null);
    setError(null);
    setSuccess(null);
    
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all",
          isDragActive ? "border-primary bg-primary/5" : "border-border",
          error ? "border-destructive" : "",
          success ? "border-green-500" : ""
        )}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="w-full flex flex-col items-center gap-2">
            <div className="relative w-full max-w-[300px] aspect-video">
              <img
                src={preview}
                alt="Preview"
                className="object-cover rounded-md w-full h-full"
              />
            </div>
            <p className="text-sm text-muted-foreground">{image?.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="bg-muted p-4 rounded-full">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">
              {isDragActive ? "Drop the image here" : "Drag & Drop or Click to upload"}
            </p>
            <p className="text-xs text-muted-foreground">
              {acceptedFileTypes.map(type => type.replace("image/", "")).join(", ")} (Max: {(maxSize / (1024 * 1024)).toFixed(0)}MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="text-destructive text-sm flex items-center gap-1 p-2 bg-destructive/10 rounded">
          <X className="h-4 w-4" />
          {error}
        </div>
      )}

      {success && !error && (
        <div className="text-green-600 text-sm flex items-center gap-1 p-2 bg-green-50 rounded">
          <ImageIcon className="h-4 w-4" />
          {success}
        </div>
      )}

      <div className="flex gap-2 justify-end">
        {image && (
          <Button variant="destructive" size="sm" onClick={clearImage}>
            <X className="h-4 w-4 mr-2" /> Clear
          </Button>
        )}
        <Button variant="secondary" size="sm" {...getRootProps()}>
          <Upload className="h-4 w-4 mr-2" /> Select Image
        </Button>
      </div>
    </div>
  );
}
