import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// GET /api/registrations - Get all registrations
export async function GET() {
  const client = getSupabaseClient();
  
  try {
    const { data, error } = await client
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(`查询失败: ${error.message}`);
    
    return NextResponse.json({ registrations: data || [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : '服务器错误';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/registrations - Create a new registration
export async function POST(request: NextRequest) {
  const client = getSupabaseClient();
  
  try {
    const body = await request.json();
    const { team_name, guild, captain, members, operator } = body;

    if (!team_name || !guild || !captain || !members || !operator) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }

    // Check if team name already exists
    const { data: existingTeam, error: checkError } = await client
      .from('registrations')
      .select('team_name')
      .eq('team_name', team_name)
      .maybeSingle();
    
    if (checkError) throw new Error(`查询失败: ${checkError.message}`);
    
    if (existingTeam) {
      return NextResponse.json({ error: '该战队名称已存在' }, { status: 409 });
    }

    // Create registration
    const { data, error } = await client
      .from('registrations')
      .insert({ team_name, guild, captain, members, operator })
      .select()
      .single();
    
    if (error) throw new Error(`创建失败: ${error.message}`);

    // Log the operation
    const { error: logError } = await client
      .from('operation_logs')
      .insert({ action: 'register', team_name, operator });
    
    if (logError) throw new Error(`记录日志失败: ${logError.message}`);
    
    return NextResponse.json({ success: true, registration: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : '服务器错误';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/registrations - Delete a registration
export async function DELETE(request: NextRequest) {
  const client = getSupabaseClient();
  
  try {
    const { searchParams } = new URL(request.url);
    const teamName = searchParams.get('team_name');
    const operator = searchParams.get('operator');

    if (!teamName || !operator) {
      return NextResponse.json({ error: '缺少战队名称或操作人' }, { status: 400 });
    }

    // Check if the registration exists and get the operator
    const { data: registration, error: checkError } = await client
      .from('registrations')
      .select('operator')
      .eq('team_name', teamName)
      .maybeSingle();
    
    if (checkError) throw new Error(`查询失败: ${checkError.message}`);
    
    if (!registration) {
      return NextResponse.json({ error: '战队不存在' }, { status: 404 });
    }

    // Check if the operator is the one who created the registration
    if (registration.operator !== operator) {
      return NextResponse.json({ error: '只有报名该战队的账号才能取消报名' }, { status: 403 });
    }

    // Delete the registration
    const { error } = await client
      .from('registrations')
      .delete()
      .eq('team_name', teamName);
    
    if (error) throw new Error(`删除失败: ${error.message}`);

    // Log the operation
    const { error: logError } = await client
      .from('operation_logs')
      .insert({ action: 'cancel', team_name: teamName, operator });
    
    if (logError) throw new Error(`记录日志失败: ${logError.message}`);
    
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : '服务器错误';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
