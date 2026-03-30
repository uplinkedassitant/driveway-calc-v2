"use client";

import React, { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (image: string) => void;
}

export function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WebP)");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageSelect(result);
    };
    reader.onerror = () => setError("Error reading file. Please try again.");
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] gap-6 px-4">
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold">Measure from photos</h2>
        <p className="text-muted-foreground">Upload an overhead image, set a scale reference, then draw your area</p>
      </div>

      <div
        className={cn(
          "w-full max-w-lg p-12 border-2 border-dashed rounded-xl text-center transition-all cursor-pointer",
          isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/50 hover:bg-muted/30"
        )}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 rounded-full bg-muted">
            <Upload className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-base font-medium">Drop image here or click to upload</p>
            <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP · Overhead shots recommended</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <Button size="lg" onClick={() => document.getElementById("file-input")?.click()}>
          <ImageIcon className="w-4 h-4 mr-2" /> Choose photo
        </Button>
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <div className="text-xs text-muted-foreground max-w-md text-center space-y-1 border rounded-lg p-4 bg-muted/20">
        <p className="font-medium text-sm mb-2">Tips for best accuracy</p>
        <ul className="text-left space-y-1 list-disc list-inside">
          <li>Include a tape measure or object of known length in the photo</li>
          <li>Shoot from directly overhead to minimize perspective distortion</li>
          <li>Good even lighting with minimal shadows</li>
          <li>Set scale reference before drawing the area polygon</li>
        </ul>
      </div>
    </div>
  );
}
