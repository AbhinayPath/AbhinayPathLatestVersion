import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

// POST: Upload file to Supabase Storage
export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({
        error: `File too large. Maximum size is ${file.type.startsWith('video/') ? '50MB' : '10MB'}`
      }, { status: 400 })
    }

    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `${user.id}/${type}/${timestamp}.${extension}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('talent-media')
      .upload(filename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({
        error: 'Failed to upload file',
        details: uploadError.message
      }, { status: 500 })
    }

    const { data: { publicUrl } } = supabase.storage
      .from('talent-media')
      .getPublicUrl(filename)

    return NextResponse.json({
      url: publicUrl,
      filename: uploadData.path,
      type: file.type.startsWith('video/') ? 'video' : 'image'
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// DELETE: Remove file from Supabase Storage
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 })
    }

    if (!filename.startsWith(user.id + '/')) {
      return NextResponse.json({ error: 'Unauthorized to delete this file' }, { status: 403 })
    }

    const { error: deleteError } = await supabase.storage
      .from('talent-media')
      .remove([filename])

    if (deleteError) {
      console.error('Delete error:', deleteError)
      return NextResponse.json({
        error: 'Failed to delete file',
        details: deleteError.message
      }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'File deleted successfully' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
