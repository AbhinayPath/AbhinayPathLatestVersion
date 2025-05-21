"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Button } from "@/components/ui/button";
import { Upload, Check, AlertCircle } from "lucide-react";
import { uploadAuditionImage } from "@/lib/supabase";

export default function ImageUploaderPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    // Reset upload status when a new image is selected
    setUploadStatus(null);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setUploadStatus({
        type: "error",
        message: "Please select an image first"
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus(null);
      
      // Call the uploadAuditionImage function from supabase.ts
      const imageUrl = await uploadAuditionImage(selectedImage);
      
      setUploadStatus({
        type: "success",
        message: "Image uploaded successfully to Supabase storage!"
      });
      
      console.log("Uploaded image URL:", imageUrl);
      
      // Here you can do additional operations with the imageUrl
      // like saving it to a database record, etc.
      
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus({
        type: "error",
        message: error instanceof Error 
          ? `Upload failed: ${error.message}` 
          : "Upload failed: Unknown error"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="text-3xl font-bold mb-6">Image Uploader</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Upload an Image</h2>
          <p className="text-muted-foreground mb-4">
            The component supports drag and drop or click to select files.
          </p>
          <ImageUploader 
            onImageChange={handleImageChange}
            maxSize={2 * 1024 * 1024} // 2MB
          />

          {/* Upload status message */}
          {uploadStatus && (
            <div className={`mt-4 p-3 rounded-md flex items-center gap-2 ${
              uploadStatus.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {uploadStatus.type === 'success' 
                ? <Check className="h-5 w-5" /> 
                : <AlertCircle className="h-5 w-5" />}
              <span>{uploadStatus.message}</span>
            </div>
          )}
          
          {/* Submit button to upload to Supabase */}
          <div className="mt-4">
            <Button 
              onClick={handleSubmit}
              disabled={!selectedImage || isUploading}
              className="w-full sm:w-auto"
            >
              {isUploading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                        Submit
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Selected Image Information</h3>
          {selectedImage ? (
            <div className="p-4 bg-muted rounded-md">
              <p><strong>Name:</strong> {selectedImage.name}</p>
              <p><strong>Size:</strong> {(selectedImage.size / 1024).toFixed(2)} KB</p>
              <p><strong>Type:</strong> {selectedImage.type}</p>
              <p><strong>Last Modified:</strong> {new Date(selectedImage.lastModified).toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No image selected</p>
          )}
        </div>
      </div>
    </div>
  );
}
