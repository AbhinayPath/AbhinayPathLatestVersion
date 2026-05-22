"use client"

import { useState } from "react"
import { TalentTraining } from "@/lib/types/talent"
import { Award, ExternalLink, Pencil, Plus, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CertificationsCardProps {
  training: Partial<TalentTraining>[];
  isEditable?: boolean;
  onUpdate?: (section: string, data: any) => Promise<void>;
}

function TrainingEditDialog({ training, onUpdate }: { training: Partial<TalentTraining>[], onUpdate: (section: string, data: any) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<TalentTraining>[]>(training || [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate('training', { training: formData })
      setOpen(false)
    } finally {
      setIsSaving(false)
    }
  }

  const addTraining = () => {
    setFormData([...formData, {
      workshop_name: '',
      institution: '',
      start_date: '',
      end_date: '',
      description: '',
      certificate_url: ''
    }])
  }

  const removeTraining = (index: number) => {
    const newTrain = [...formData]
    newTrain.splice(index, 1)
    setFormData(newTrain)
  }

  const updateTraining = (index: number, field: string, value: string) => {
    const newTrain = [...formData]
    newTrain[index] = { ...newTrain[index], [field]: value }
    setFormData(newTrain)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full" onClick={() => setFormData(training || [])}>
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Licenses & Certifications</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {formData.map((train, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4 relative">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">Certification {index + 1}</h4>
                <Button
                  onClick={() => removeTraining(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input
                    value={train.workshop_name || ''}
                    onChange={(e) => updateTraining(index, 'workshop_name', e.target.value)}
                    placeholder="e.g. Acting Workshop"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                  <Input
                    value={train.institution || ''}
                    onChange={(e) => updateTraining(index, 'institution', e.target.value)}
                    placeholder="e.g. Drama School"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <Input
                    type="date"
                    value={train.start_date || ''}
                    onChange={(e) => updateTraining(index, 'start_date', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL</label>
                  <Input
                    value={train.certificate_url || ''}
                    onChange={(e) => updateTraining(index, 'certificate_url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    value={train.description || ''}
                    onChange={(e) => updateTraining(index, 'description', e.target.value)}
                    placeholder="Describe the certification..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addTraining} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Certification
          </Button>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function CertificationsCard({ training, isEditable, onUpdate }: CertificationsCardProps) {
  const hasTraining = training && training.length > 0;

  if (!hasTraining && !isEditable) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Licenses & Certifications</h2>
        {isEditable && onUpdate && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <TrainingEditDialog training={training} onUpdate={onUpdate} />
          </div>
        )}
      </div>
      
      {!hasTraining ? (
        <p className="text-gray-500 italic text-sm">No certifications added yet.</p>
      ) : (
        <div className="space-y-6">
          {training.map((item, index) => (
            <div key={item.id || index} className="flex items-start group/item">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 shrink-0 mr-4 group-hover/item:border-primary/30 transition-colors">
                <Award className="w-6 h-6 text-gray-400 group-hover/item:text-primary transition-colors" />
              </div>
              
              <div className="flex-1 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-900">{item.workshop_name || 'Certification'}</h3>
                <div className="text-base text-gray-700 mt-0.5">{item.institution || 'Issuing Organization'}</div>
                
                <div className="text-sm text-gray-500 mt-1">
                  Issued {item.start_date ? new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Date'}
                </div>
                
                {item.certificate_url && (
                  <a href={item.certificate_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Show credential <ExternalLink className="w-3.5 h-3.5 ml-1.5 text-gray-400" />
                  </a>
                )}
                {item.description && (
                  <div className="mt-3 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
