import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

// Upload cover or gallery images for workshops.
// Uses existing 'talent-media' bucket under a scoped 'workshops' folder.
export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = (formData.get('type') as string) || 'cover' // 'cover' | 'gallery'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only JPEG, PNG, WebP images are allowed.' 
      }, { status: 400 })
    }

    // Limit size to 5MB for workshop images (matches UI guidance)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Image must be less than 5MB' }, { status: 400 })
    }

    const timestamp = Date.now()
    const fileName = `${user.id}/workshops/${type}/${timestamp}-${file.name}`

    // Upload to Supabase Storage (reusing 'talent-media' bucket)
    const { data, error } = await supabase.storage
      .from('talent-media')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (error) {
      console.error('Workshop media upload error:', error)
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
    }

    const { data: publicData } = supabase.storage
      .from('talent-media')
      .getPublicUrl(fileName)

    return NextResponse.json({ success: true, url: publicData.publicUrl, fileName: data.path })
  } catch (error) {
    console.error('POST /api/workshops/media failed:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}