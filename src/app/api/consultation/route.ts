import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "이름과 연락처는 필수입니다" },
        { status: 400 }
      );
    }

    const notionApiKey = process.env.NOTION_API_KEY;
    const notionDatabaseId = process.env.NOTION_DATABASE_ID;

    if (!notionApiKey || !notionDatabaseId) {
      console.log("Notion API not configured. Logging to console instead:");
      console.log({ name, phone, message, timestamp: new Date().toISOString() });
      
      return NextResponse.json({ 
        success: true, 
        message: "상담 신청이 접수되었습니다 (Notion 미연동)" 
      });
    }

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: notionDatabaseId },
        properties: {
          이름: {
            title: [{ text: { content: name } }],
          },
          연락처: {
            phone_number: phone,
          },
          상담내용: {
            rich_text: [{ text: { content: message || "" } }],
          },
          신청일시: {
            date: { start: new Date().toISOString() },
          },
          상태: {
            select: { name: "신규" },
          },
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Notion API error:", error);
      return NextResponse.json(
        { error: "상담 신청 중 오류가 발생했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "상담 신청이 접수되었습니다" 
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
