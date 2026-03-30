"use client";

import React, { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { MeasurementCanvas } from "@/components/MeasurementCanvas";
import { useMeasurementStore } from "@/store/useMeasurementStore";
import { Button } from "@/components/ui/button";
import { Save, FileText, Trash2 } from "lucide-react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [savePrompt, setSavePrompt] = useState(false);
  const [jobName, setJobName] = useState("");
  const { savedJobs, saveJob, deleteJob, loadJob, clearAll, setCurrentJob } = useMeasurementStore();

  const handleImageSelect = (imageData: string) => {
    setImage(imageData);
    setCurrentJob({ id: Date.now().toString(), name: "Untitled", image: imageData, perimeterPoints: [], areaClosed: false, scaleStart: null, scaleEnd: null, scaleLengthFeet: 10, slopeStart: null, slopeEnd: null, slopeRiseInches: 0, createdAt: Date.now() });
    clearAll();
  };

  const handleSaveConfirm = () => {
    if (jobName.trim()) {
      saveJob(jobName.trim());
      setSavePrompt(false);
      setJobName("");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">DrivewayCalc</h1>
            <p className="text-xs text-muted-foreground">Job site measurement tool</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowHistory(!showHistory)}>
              <FileText className="w-4 h-4 mr-1.5" />
              History {savedJobs.length > 0 && `(${savedJobs.length})`}
            </Button>
            {image && (
              <Button size="sm" onClick={() => setSavePrompt(true)}>
                <Save className="w-4 h-4 mr-1.5" /> Save job
              </Button>
            )}
          </div>
        </div>

        {!image ? (
          <ImageUploader onImageSelect={handleImageSelect} />
        ) : (
          <div>
            <div className="mb-3">
              <Button variant="outline" size="sm" onClick={() => {
                setImage(null);
                clearAll();
              }}>
                ← New image
              </Button>
            </div>
            <MeasurementCanvas image={image} />
          </div>
        )}

        {/* Save prompt */}
        {savePrompt && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl border">
              <h2 className="text-lg font-semibold mb-4">Save job</h2>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 text-sm mb-4 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Job name (e.g. 123 Main St)"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveConfirm()}
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => { setSavePrompt(false); setJobName(""); }}>Cancel</Button>
                <Button size="sm" onClick={handleSaveConfirm} disabled={!jobName.trim()}>Save</Button>
              </div>
            </div>
          </div>
        )}

        {/* History modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-xl border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Saved jobs</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowHistory(false)}>✕</Button>
              </div>
              {savedJobs.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No saved jobs yet</p>
              ) : (
                <div className="grid gap-3">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="flex items-center gap-3 p-3 rounded-lg border bg-background">
                      {job.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={job.image} alt={job.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{job.name}</div>
                        <div className="text-xs text-muted-foreground">{new Date(job.createdAt).toLocaleDateString()}</div>
                        {job.perimeterPoints.length >= 3 && (
                          <div className="text-xs text-muted-foreground">{job.perimeterPoints.length} pts drawn</div>
                        )}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button variant="outline" size="sm" onClick={() => {
                          loadJob(job);
                          setImage(job.image);
                          setShowHistory(false);
                        }}>Load</Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteJob(job.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
