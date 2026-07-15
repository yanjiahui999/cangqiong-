import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/operation-logs - Get operation logs (only for admin)
export async function GET(request: NextRequest) {
  const client = getSupabaseClient();
  
  try {
    const { searchParams } = new URL(request.url);
    const operator = searchParams.get('operator');

    // Only admin (guanliyuan) can view logs
    if (operator !== 'guanliyuan') {
      return NextResponse.json({ error: '无权限查看操作记录' }, { status: 403 });
    }

    const { data, error } = await client
      .from('operation_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) throw new Error(`查询失败: ${error.message}`);
    
    return NextResponse.json({ logs: data || [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : '服务器错误';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
