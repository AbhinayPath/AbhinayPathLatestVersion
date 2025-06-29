import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.log('🔐 media Authenticated user:',user );
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'profile', 'headshot', 'portfolio'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only JPEG, PNG, WebP images and MP4, WebM videos are allowed.' 
      }, { status: 400 })
    }

    // Validate file size (10MB for images, 50MB for videos)
    const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${file.type.startsWith('video/') ? '50MB' : '10MB'}` 
      }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileName = `${user.id}/${type}/${timestamp}-${file.name}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('talent-media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Storage upload error:', error)
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('talent-media')
      .getPublicUrl(fileName)

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      fileName: data.path
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const fileName = searchParams.get('file')

    if (!fileName) {
      return NextResponse.json({ error: 'File name required' }, { status: 400 })
    }

    // Verify the file belongs to the user
    if (!fileName.startsWith(`${user.id}/`)) {
      return NextResponse.json({ error: 'Unauthorized to delete this file' }, { status: 403 })
    }

    const { error } = await supabase.storage
      .from('talent-media')
      .remove([fileName])

    if (error) {
      console.error('Storage delete error:', error)
      return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'File deleted successfully' })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}