import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

// POST /api/auth - Handle login and register
export async function POST(request: NextRequest) {
  const client = getSupabaseClient();
  
  try {
    const body = await request.json();
    const { action, username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: '用户名和密码不能为空' }, { status: 400 });
    }

    // Validate username: English letters + numbers only, min 8 chars
    const usernameRegex = /^[a-zA-Z0-9]{8,}$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json({ error: '用户名必须为纯英文+数字，不少于8位' }, { status: 400 });
    }

    // Validate password: min 6 chars
    if (password.length < 6) {
      return NextResponse.json({ error: '密码不少于6位' }, { status: 400 });
    }

    if (action === 'register') {
      // Check if username already exists
      const { data: existingUser, error: checkError } = await client
        .from('users')
        .select('username')
        .eq('username', username)
        .maybeSingle();
      
      if (checkError) throw new Error(`查询失败: ${checkError.message}`);
      
      if (existingUser) {
        return NextResponse.json({ error: '该用户名已存在' }, { status: 409 });
      }

      // Create new user
      const { data, error } = await client
        .from('users')
        .insert({ username, password })
        .select('username, created_at')
        .single();
      
      if (error) throw new Error(`注册失败: ${error.message}`);
      
      return NextResponse.json({ success: true, user: data });
    }

    if (action === 'login') {
      // Find user
      const { data: user, error } = await client
        .from('users')
        .select('username, password')
        .eq('username', username)
        .maybeSingle();
      
      if (error) throw new Error(`查询失败: ${error.message}`);
      
      if (!user || user.password !== password) {
        return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
      }
      
      return NextResponse.json({ success: true, user: { username: user.username } });
    }

    return NextResponse.json({ error: '无效的操作' }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : '服务器错误';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
