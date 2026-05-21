"use client"

import { useState } from "react"
import { Play, ExternalLink, Github, Pencil, Plus, X, Loader2, Image as ImageIcon, Video, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies?: string[];
}

interface ProjectsPortfolioProps {
  portfolioImages: string[];
  portfolioVideos: string[];
  projects?: Project[]; // Optional mock data support
  isEditable?: boolean;
  onUpdate?: (section: string, data: any) => Promise<void>;
}

function PortfolioEditDialog({ portfolioImages, portfolioVideos, onUpdate }: { 
  portfolioImages: string[], 
  portfolioVideos: string[], 
  onUpdate: (section: string, data: any) => Promise<void> 
}) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>(portfolioImages || [])
  const [videos, setVideos] = useState<string[]>(portfolioVideos || [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type === 'image' ? 'portfolio-image' : 'portfolio-video')

    try {
      const response = await fetch('/api/talent-profile/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const data = await response.json()
      if (type === 'image') {
        setImages(prev => [...prev, data.url])
      } else {
        setVideos(prev => [...prev, data.url])
      }
    } catch (error: any) {
      console.error('Error uploading file:', error)
      alert(error.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const removeMedia = (index: number, type: 'image' | 'video') => {
    if (type === 'image') {
      setImages(prev => prev.filter((_, i) => i !== index))
    } else {
      setVideos(prev => prev.filter((_, i) => i !== index))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate('portfolio', { 
        portfolio_images: images,
        portfolio_videos: videos
      })
      setOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full" onClick={() => {
          setImages(portfolioImages || [])
          setVideos(portfolioVideos || [])
        }}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Portfolio Media</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Images
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" /> Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-3 max-h-[40vh] overflow-y-auto pr-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 group bg-gray-50">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeMedia(idx, 'image')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-purple-400 hover:bg-purple-50/50 cursor-pointer transition-all">
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} disabled={uploading} />
                {uploading ? <Loader2 className="h-5 w-5 animate-spin text-purple-600" /> : <Plus className="h-5 w-5 text-gray-400" />}
                <span className="text-[10px] mt-1 text-gray-500 font-medium">Add Image</span>
              </label>
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto pr-2">
              {videos.map((vid, idx) => (
                <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 group bg-gray-50">
                  <video src={vid} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white/80" />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeMedia(idx, 'video')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <label className="flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed border-gray-200 hover:border-purple-400 hover:bg-purple-50/50 cursor-pointer transition-all">
                <input type="file" className="hidden" accept="video/*" onChange={(e) => handleFileUpload(e, 'video')} disabled={uploading} />
                {uploading ? <Loader2 className="h-5 w-5 animate-spin text-purple-600" /> : <Plus className="h-5 w-5 text-gray-400" />}
                <span className="text-[10px] mt-1 text-gray-500 font-medium">Add Video</span>
              </label>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving || uploading}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving || uploading} className="bg-purple-600 hover:bg-purple-700">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ProjectsPortfolio({ portfolioImages, portfolioVideos, projects = [], isEditable, onUpdate }: ProjectsPortfolioProps) {
  // Use DB data if available, else fallback to mock projects if provided, else return null if totally empty
  const hasDbMedia = (portfolioImages && portfolioImages.length > 0) || (portfolioVideos && portfolioVideos.length > 0);
  const hasProjects = projects && projects.length > 0;
  
  if (!hasDbMedia && !hasProjects && !isEditable) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Portfolio & Projects</h2>
        {isEditable && onUpdate && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <PortfolioEditDialog 
              portfolioImages={portfolioImages || []} 
              portfolioVideos={portfolioVideos || []} 
              onUpdate={onUpdate} 
            />
          </div>
        )}
      </div>
      
      {!hasDbMedia && !hasProjects ? (
        <p className="text-gray-500 italic text-sm">No portfolio items added yet.</p>
      ) : hasProjects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 bg-white">
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {project.type === 'Video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm shadow-lg">
                      <Play className="w-5 h-5 text-gray-900 ml-1" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{project.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies?.map(tech => (
                    <span key={tech} className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md border border-gray-100">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                      <Github className="w-3.5 h-3.5 mr-1.5" /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {portfolioVideos?.map((video, idx) => (
             <div key={`video-${idx}`} className="aspect-square relative rounded-xl overflow-hidden group bg-gray-100 border border-gray-100">
               <video src={video} className="w-full h-full object-cover" />
               <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-4 h-4 text-gray-900 ml-0.5" />
                  </div>
               </div>
             </div>
          ))}
          {portfolioImages?.map((img, idx) => (
            <div key={`img-${idx}`} className="aspect-square relative rounded-xl overflow-hidden border border-gray-100">
              <img src={img} alt={`Portfolio item ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

