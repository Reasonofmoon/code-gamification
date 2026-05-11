import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  languageId: z.enum(["javascript", "python"]),
  code: z.string().max(20_000),
  testCases: z
    .array(
      z.object({
        stdin: z.string().default(""),
        expectedStdout: z.string(),
      })
    )
    .min(1)
    .max(20),
});

const JUDGE0_LANG_IDS: Record<"javascript" | "python", number> = {
  javascript: 93, // Node.js 18 on Judge0 CE
  python: 71, // Python 3.8 on Judge0 CE
};

type Judge0Submission = {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: { id: number; description: string };
};

async function runOnce(
  languageId: number,
  code: string,
  stdin: string
): Promise<Judge0Submission | { error: string }> {
  const apiKey = process.env.JUDGE0_RAPIDAPI_KEY;
  const apiHost = process.env.JUDGE0_RAPIDAPI_HOST ?? "judge0-ce.p.rapidapi.com";
  if (!apiKey) {
    return {
      error:
        "Judge0 API 키가 설정되지 않았습니다. .env.local 에 JUDGE0_RAPIDAPI_KEY 를 추가하세요.",
    };
  }
  const res = await fetch(
    `https://${apiHost}/submissions?base64_encoded=false&wait=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": apiHost,
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin,
        cpu_time_limit: 3,
        wall_time_limit: 5,
      }),
    }
  );
  if (!res.ok) {
    return { error: `Judge0 응답 오류: ${res.status}` };
  }
  return (await res.json()) as Judge0Submission;
}

function normalize(s: string): string {
  return s.replace(/\r\n/g, "\n").trimEnd();
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "JSON 본문이 아닙니다" },
      { status: 400 }
    );
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "잘못된 요청 형식", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const { languageId, code, testCases } = parsed.data;
  const judge0Id = JUDGE0_LANG_IDS[languageId];

  const cases: { expected: string; got: string; passed: boolean }[] = [];
  let stderr = "";
  for (const tc of testCases) {
    const result = await runOnce(judge0Id, code, tc.stdin);
    if ("error" in result) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 502 }
      );
    }
    const stdout = normalize(result.stdout ?? "");
    const expected = normalize(tc.expectedStdout);
    const compileMsg = result.compile_output || result.message || "";
    if (compileMsg) stderr += compileMsg + "\n";
    if (result.stderr) stderr += result.stderr + "\n";
    cases.push({
      expected,
      got: stdout,
      passed: stdout === expected,
    });
  }

  const passed = cases.every((c) => c.passed);
  return NextResponse.json({
    ok: true,
    passed,
    cases,
    stderr: stderr.trim() || undefined,
  });
}

export const runtime = "nodejs";
// Judge0 wait=true 응답이 보통 1~3초이지만, Cold start 마진까지 포함해 10초.
// 기본 300s 까지 갈 필요는 없음 — Active CPU 비용 절감.
export const maxDuration = 10;
