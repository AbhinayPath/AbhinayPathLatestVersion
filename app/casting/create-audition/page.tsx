"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import { useAuth } from '@/contexts/AuthContext';

const auditionFields = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'type', label: 'Type', type: 'text', required: true },
  { name: 'location', label: 'Location', type: 'text', required: true },
  { name: 'state', label: 'State', type: 'text', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'director', label: 'Director', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'company', label: 'Company', type: 'text', required: false },
  { name: 'contact', label: 'Contact', type: 'text', required: false },
  { name: 'experience', label: 'Experience', type: 'text', required: false },
  { name: 'image', label: 'Image URL', type: 'text', required: false },
  { name: 'application_process', label: 'Application Process', type: 'textarea', required: false },
  { name: 'companyLink', label: 'Company Link', type: 'text', required: false },
  { name: 'contactType', label: 'Contact Type', type: 'text', required: false },
  { name: 'roles', label: 'Roles (comma separated)', type: 'text', required: false },
  { name: 'requirements', label: 'Requirements (comma separated)', type: 'text', required: false },
];

const defaultCustomField = {
  label: '',
  field_name: '',
  type: 'text',
  required: false,
  options: '',
  description: '',
  collapsed: false,
};

const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'dropdown', label: 'Dropdown' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'video', label: 'Video URL' },
];

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

const CreateAuditionPage = () => {
  const [loading, setLoading] = useState(false);
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [auditionData, setAuditionData] = useState<Record<string, any>>({});
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Role gating
  if (!authLoading && (!user || user.user_metadata?.profession?.toLowerCase() !== 'director')) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-500">Only casting directors can create auditions.</p>
          <Link href="/">
            <Button className="mt-6">Go Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { ...defaultCustomField }]);
  };

  const handleCustomFieldChange = (idx: number, key: string, value: any) => {
    setCustomFields((fields) => {
      const updated = [...fields];
      if (key === 'label') {
        updated[idx].label = value;
        updated[idx].field_name = slugify(value);
      } else {
        updated[idx][key] = value;
      }
      return updated;
    });
  };

  const handleRemoveCustomField = (idx: number) => {
    setCustomFields((fields) => fields.filter((_, i) => i !== idx));
  };

  const handleCollapseCustomField = (idx: number) => {
    setCustomFields((fields) => {
      const updated = [...fields];
      updated[idx].collapsed = !updated[idx].collapsed;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Step 1: Insert into `auditions`
    if (!user || !user.id) {
      setLoading(false);
      alert('User not authenticated.');
      return;
    }

    const { data: audition, error } = await supabase
      .from('auditions')
      .insert({
        ...auditionData,
        created_by: user.id,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (!audition) {
      setLoading(false);
      alert(error?.message || 'Could not create audition.');
      return;
    }

    // Step 2: Insert dynamic requirements
    if (customFields.length) {
      const enriched = customFields.map((r, i) => ({
        ...r,
        audition_id: audition.id,
        order_index: i,
      }));
      const { error: reqError } = await supabase.from('audition_requirements').insert(enriched);
      if (reqError) {
        setLoading(false);
        alert('Error saving requirements: ' + reqError.message);
        return;
      }
    }

    setLoading(false);
    alert('Audition created successfully!');
    router.push('/casting');
  };

  const handleAuditionFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuditionData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#f9f5f7] to-[#f0e6ea] flex flex-col">
      {/* Dashboard Header */}
      <header className="w-full px-0 md:px-12 py-6 border-b border-gray-200 bg-white/80 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <PlusCircle className="w-10 h-10 text-[#7E1F2E]" />
          <div>
            <h1 className="text-3xl font-extrabold text-[#7E1F2E]">Casting Dashboard</h1>
            <div className="text-gray-500 text-base mt-1">Create and manage your auditions in one place.</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#f8e6ec] border border-[#e5c7d1] rounded-xl px-6 py-3 flex flex-col items-center shadow">
            <span className="font-bold text-lg text-[#7E1F2E]">{customFields.length}</span>
            <span className="text-xs text-gray-600">Custom Fields</span>
          </div>
        </div>
      </header>

      {/* Stepper Progress */}
      <div className="w-full max-w-2xl mx-auto mt-6">
        <div className="flex items-center justify-between mb-4">
          {["Audition Details", "Applicant Fields", "Preview & Submit"].map((label, idx) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white ${step === idx ? 'bg-[#7E1F2E]' : 'bg-gray-300'}`}>{idx + 1}</div>
              <span className={`mt-2 text-xs ${step === idx ? 'text-[#7E1F2E]' : 'text-gray-500'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stepper Body */}
      <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col justify-center">
        {/* Step 1: Audition Details */}
        {step === 0 && (
          <form className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col gap-6" onSubmit={e => { e.preventDefault(); setStep(1); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditionFields.slice(0, 6).map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label htmlFor={field.name} className="font-medium text-gray-800">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <Input id={field.name} name={field.name} type={field.type} required={field.required} value={auditionData[field.name] || ''} onChange={handleAuditionFieldChange} />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {auditionFields.slice(6, 7).map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label htmlFor={field.name} className="font-medium text-gray-800">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <Textarea id={field.name} name={field.name} required={field.required} className="resize-none" value={auditionData[field.name] || ''} onChange={handleAuditionFieldChange} />
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="rounded-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white px-8 py-2 font-semibold shadow-lg">Next</Button>
            </div>
          </form>
        )}

        {/* Step 2: Custom Applicant Fields */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col gap-6">
            <div className="border rounded-xl bg-[#fafafa]">
              <div className="border-b px-6 py-4">
                <span className="text-2xl font-bold">Custom Applicant Fields</span>
              </div>
              <div className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-center font-semibold text-gray-700 mb-2">
                  <div className="col-span-3">Label</div>
                  <div className="col-span-3">Field Name</div>
                  <div className="col-span-2">Input Type</div>
                  <div className="col-span-2">Required</div>
                  <div className="col-span-2 text-center"></div>
                </div>
                {customFields.map((field, idx) => (
  <React.Fragment key={idx}>
    <div className="grid grid-cols-12 gap-4 items-center mb-3">
      <div className="col-span-3">
        <Input value={field.label} onChange={e => handleCustomFieldChange(idx, 'label', e.target.value)} placeholder="Label" />
      </div>
      <div className="col-span-3">
        <Input value={field.field_name} disabled placeholder="Auto" />
      </div>
      <div className="col-span-2">
        <select value={field.type} onChange={e => handleCustomFieldChange(idx, 'type', e.target.value)} className="rounded border px-2 py-1 w-full">
          {fieldTypes.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <input
          type="checkbox"
          className="w-5 h-5 accent-[#7E1F2E] border-gray-300 rounded"
          checked={field.required}
          onChange={e => handleCustomFieldChange(idx, 'required', e.target.checked)}
        />
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <Button type="button" size="icon" variant="ghost" onClick={() => handleRemoveCustomField(idx)}>
          <span className="sr-only">Remove</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 hover:text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>
      <div className="col-span-12 mt-2">
        <Input value={field.description} onChange={e => handleCustomFieldChange(idx, 'description', e.target.value)} placeholder="Description (optional)" />
      </div>
      {field.type === 'dropdown' && (
        <div className="col-span-12 mt-2">
          <Input value={field.options} onChange={e => handleCustomFieldChange(idx, 'options', e.target.value)} placeholder="Options (comma-separated)" />
        </div>
      )}
    </div>
    {customFields.length > 1 && idx !== customFields.length - 1 && (
      <div className="border-t border-black my-4"></div>
    )}
  </React.Fragment>
))}
                {customFields.length === 0 && (
                  <div className="text-gray-400 italic mb-4">No custom fields added.</div>
                )}
              </div>
            </div>
            <button
              type="button"
              className="text-[#7E1F2E] text-base font-medium flex items-center gap-2 mt-4 hover:underline"
              onClick={handleAddCustomField}
            >
              <PlusCircle className="w-5 h-5 mr-1" /> Add Another Field
            </button>
            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setStep(0)}>Back</Button>
              <Button type="button" className="rounded-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white px-8 py-2 font-semibold shadow-lg" onClick={() => setStep(2)}>Next</Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview & Submit */}
        {step === 2 && (
          <form className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-[#7E1F2E]" />
              <span className="font-bold text-[#7E1F2E]">Applicant Form Preview</span>
              <Button type="button" size="sm" variant="outline" className="ml-auto" onClick={() => setPreviewOpen(true)}>Open Full Preview</Button>
            </div>
            <div className="border rounded-2xl shadow bg-gradient-to-br from-[#f8e6ec] to-[#fff] p-4 max-h-[300px] overflow-auto">
              <div className="grid gap-4">
                {customFields.map((field, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <label className="font-medium">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                      {field.description && (
                        <span className="ml-2 text-xs text-gray-400">{field.description}</span>
                      )}
                    </label>
                    {field.type === 'dropdown' ? (
                      <select className="rounded border px-2 py-1">
                        {(field.options || '').split(',').map((opt: string) => <option key={opt.trim()}>{opt.trim()}</option>)}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <Textarea className="resize-none" />
                    ) : field.type === 'number' ? (
                      <Input type="number" />
                    ) : field.type === 'video' ? (
                      <Input type="url" placeholder="Paste video URL" />
                    ) : (
                      <Input type="text" />
                    )}
                  </div>
                ))}
                {customFields.length === 0 && (
                  <div className="text-gray-400 italic">No custom fields to preview.</div>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setStep(1)}>Back</Button>
              <Button type="submit" className="rounded-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white px-8 py-2 font-semibold shadow-lg">Create Audition</Button>
            </div>
          </form>
        )}
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-[#7E1F2E]" />
              <span className="font-bold text-[#7E1F2E]">Full Applicant Form Preview</span>
              <Button type="button" size="sm" variant="ghost" className="ml-auto" onClick={() => setPreviewOpen(false)}>Close</Button>
            </div>
            <form className="grid gap-5">
              {customFields.map((field, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <label className="font-medium">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                    {field.description && (
                      <span className="ml-2 text-xs text-gray-400">{field.description}</span>
                    )}
                  </label>
                  {field.type === 'dropdown' ? (
                    <select className="rounded border px-2 py-1">
                      {(field.options || '').split(',').map((opt: string) => <option key={opt.trim()}>{opt.trim()}</option>)}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <Textarea className="resize-none" />
                  ) : field.type === 'number' ? (
                    <Input type="number" />
                  ) : field.type === 'video' ? (
                    <Input type="url" placeholder="Paste video URL" />
                  ) : (
                    <Input type="text" />
                  )}
                </div>
              ))}
              {customFields.length === 0 && (
                <div className="text-gray-400 italic">No custom fields to preview.</div>
              )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default CreateAuditionPage;
