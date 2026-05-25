import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> 지도 돌아가기
      </Link>

      <section className="parchment p-6">
        <p className="text-xs uppercase tracking-widest text-muted">
          Privacy
        </p>
        <h1 className="mt-1 fantasy-title text-3xl text-accent">
          개인정보와 진행도 저장
        </h1>
        <p className="mt-4 text-sm leading-6 text-foreground/85">
          CodeQuest는 로그인 없이 동작하며 학습 진행도는 이 브라우저의
          localStorage에 저장됩니다. 미션 결과, XP, 레벨, 연속 학습일, 뱃지
          정보만 진행도 복원과 학습 피드백을 위해 사용합니다.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <InfoCard
          title="저장 위치"
          body="진행도는 사용자의 기기와 브라우저 안에 남습니다. 다른 기기로 옮기려면 홈 화면의 내보내기/가져오기 기능을 사용합니다."
        />
        <InfoCard
          title="초기화"
          body="홈 화면의 초기화 버튼으로 저장된 진행도를 삭제할 수 있습니다. 브라우저 사이트 데이터 삭제도 같은 효과를 냅니다."
        />
        <InfoCard
          title="분석 도구"
          body="배포 환경에서는 Vercel Analytics와 Speed Insights가 성능과 방문 통계를 수집할 수 있습니다. 학습 진행도 JSON은 분석 도구로 전송하지 않습니다."
        />
        <InfoCard
          title="최소 수집 원칙"
          body="이 앱은 이름, 이메일, 계정 비밀번호 같은 식별 정보를 요구하지 않습니다. 서버 API는 코드 실행 요청 처리에만 사용됩니다."
        />
      </section>
    </div>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border border-border bg-surface/50 p-4">
      <h2 className="fantasy-title text-lg text-accent">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </article>
  );
}
