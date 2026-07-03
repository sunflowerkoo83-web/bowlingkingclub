import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth/require-admin";

// 사진 업로드를 서버 액션(서버리스 함수) 대신 브라우저 -> Vercel Blob 직접 업로드로
// 처리하기 위한 토큰 발급 엔드포인트. 서버리스 함수의 요청 본문 용량 제한(~4.5MB)을
// 우회할 수 있어 대용량 사진도 업로드 가능해짐.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdminAuthenticated())) {
          throw new Error("관리자 인증이 필요합니다.");
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/heic",
            "image/heif",
          ],
          addRandomSuffix: true,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
