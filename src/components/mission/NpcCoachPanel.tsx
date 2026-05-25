"use client";

import Image from "next/image";
import { AlertTriangle, Lightbulb, MessageCircle, ShieldCheck } from "lucide-react";
import type { Mission, MissionStep } from "@/types/mission";
import { npcImageFor } from "@/lib/npc-images";

type CoachNote = {
  speaker: string;
  command: string;
  analogy: string;
  useful: string;
  caution: string;
};

type Props = {
  mission: Mission;
  step: MissionStep;
};

const FALLBACK_BY_REALM: Record<string, string> = {
  "forge-of-origin": "대장장이 에버",
  "oracle-tower": "기계 신탁 사서 메모리아",
  storybook: "사서장 세렌",
  runescar: "글자드래곤 알파베타스",
  vimkeep: "검사부 카엘",
  shellholm: "늙은 항해사 모르간",
  wasteland: "견습생 카이",
};

const COMMAND_NOTES: {
  match: RegExp;
  speaker?: string;
  command: string;
  analogy: string;
  useful: string;
  caution: string;
}[] = [
  {
    match: /^pwd$/,
    command: "pwd",
    analogy: "미로에 들어가기 전에 지도 위의 '현재 위치' 점을 보는 것과 같다.",
    useful: "지금 터미널이 어느 폴더를 기준으로 움직이는지 확인할 때 쓴다. 파일 생성, 삭제, Git 명령 전의 위치 확인 습관이다.",
    caution: "명령은 맞아도 위치가 틀리면 전혀 다른 폴더에 작업할 수 있다.",
  },
  {
    match: /^ls\b/,
    command: "ls",
    analogy: "가방을 열어 안에 든 물건 목록을 확인하는 행동이다. `-a`는 숨겨진 주머니까지 보는 옵션이다.",
    useful: "현재 폴더에 어떤 파일과 폴더가 있는지 확인한다. 숨김 파일을 찾을 때는 `ls -a`를 쓴다.",
    caution: "목록을 보여줄 뿐 파일을 열어 읽지는 않는다. 내용 확인은 `cat` 같은 명령이 필요하다.",
  },
  {
    match: /^mkdir\b/,
    command: "mkdir",
    analogy: "책장에 새 칸을 만드는 것과 같다. 아직 책은 없지만 정리할 자리가 생긴다.",
    useful: "새 프로젝트 폴더나 작업 공간을 만들 때 쓴다. 실습에서는 안전한 작업터를 분리하는 첫 단계다.",
    caution: "이미 같은 이름의 폴더가 있으면 실패할 수 있으니 폴더 이름을 확인하라.",
  },
  {
    match: /^cd\b/,
    command: "cd",
    analogy: "건물 안에서 다른 방으로 걸어 들어가는 명령이다. 방을 옮기면 보이는 물건도 달라진다.",
    useful: "작업할 폴더로 이동할 때 쓴다. Git은 현재 폴더를 기준으로 저장소를 찾는다.",
    caution: "`cd ~`처럼 큰 범위로 이동한 뒤 `git init`을 하면 엉뚱한 곳이 저장소가 될 수 있다.",
  },
  {
    match: /^mv\b/,
    command: "mv",
    analogy: "책상 위 물건을 다른 서랍으로 옮기거나 이름표를 바꿔 붙이는 일이다.",
    useful: "파일을 다른 폴더로 이동하거나 파일 이름을 바꿀 때 쓴다.",
    caution: "목적지 경로가 틀리면 파일이 예상과 다른 곳으로 이동한다. 이동 전후에 `ls`로 확인하라.",
  },
  {
    match: /^rm\b/,
    command: "rm",
    analogy: "휴지통에 버리는 행동이다. 특히 터미널에서는 되돌리기 버튼이 없다고 생각해야 한다.",
    useful: "필요 없는 파일을 지워 작업 공간을 정리할 때 쓴다.",
    caution: "실제 터미널에서는 삭제가 위험하다. 파일 이름과 현재 위치를 확인하고, 넓은 삭제 옵션은 피하라.",
  },
  {
    match: /^git\s+(-v|--version|version)$/,
    command: "git -v",
    analogy: "망치가 공구함에 들어 있는지, 손잡이에 버전 스티커가 붙어 있는지 확인하는 단계다.",
    useful: "Git이 설치되어 있고 터미널에서 실행 가능한지 확인한다.",
    caution: "버전 확인은 설치 확인일 뿐, 저장소가 준비됐다는 뜻은 아니다.",
  },
  {
    match: /^gh\s+auth\s+status$/,
    speaker: "전령 까치 코리",
    command: "gh auth status",
    analogy: "성문 앞에서 내 출입증이 누구 이름이고 어떤 문을 열 수 있는지 확인하는 일이다.",
    useful: "GitHub CLI가 어떤 계정과 권한으로 로그인되어 있는지 확인한다.",
    caution: "`repo` 같은 scope가 없으면 저장소 생성, push, PR 작업에서 막힐 수 있다.",
  },
  {
    match: /^git\s+init\b/,
    command: "git init -b main",
    analogy: "평범한 폴더에 시간 기록 장부를 펼쳐 놓는 순간이다. 이제부터 변화가 기록될 수 있다.",
    useful: "현재 폴더를 Git 저장소로 만들고 변경 이력을 기록할 준비를 한다.",
    caution: "반드시 프로젝트 폴더 안에서 실행하라. 홈 폴더에서 실행하면 개인 파일 전체가 Git 상태에 잡힐 수 있다.",
  },
  {
    match: /^echo\b/,
    command: "echo ... > file",
    analogy: "쪽지에 한 문장을 써서 지정한 상자에 넣는 것과 같다. `>`는 상자를 비우고 새 쪽지를 넣는다.",
    useful: "짧은 파일을 만들거나 내용을 덮어써서 실습 상태를 빠르게 준비할 때 쓴다.",
    caution: "`>`는 기존 내용을 덮어쓴다. 실제 프로젝트에서는 중요한 파일에 쓰기 전에 내용을 확인하라.",
  },
  {
    match: /^git\s+status$/,
    command: "git status",
    analogy: "요리하기 전 재료판을 보는 일이다. 빨간 재료는 아직 손대지 않았고 초록 재료는 냄비 옆에 올라와 있다.",
    useful: "수정됨, 새 파일, staged 상태를 확인하는 Git의 안전 점검 명령이다.",
    caution: "빨간 파일은 아직 커밋 후보가 아니고, 초록 파일만 다음 커밋에 들어간다.",
  },
  {
    match: /^git\s+add\b/,
    command: "git add",
    analogy: "사진 앨범에 넣을 사진을 먼저 골라 바구니에 담는 단계다. 아직 앨범에 붙인 것은 아니다.",
    useful: "이번 커밋에 넣을 파일을 stage에 올린다. 작업한 것 중 일부만 골라 커밋할 수 있다.",
    caution: "`git add .`는 많은 파일을 한꺼번에 올린다. 비밀키, 빌드 산출물, 큰 파일이 섞였는지 먼저 보라.",
  },
  {
    match: /^git\s+commit\b/,
    command: "git commit -m",
    analogy: "바구니에 담은 사진을 앨범 한 페이지에 붙이고 제목을 적는 일이다.",
    useful: "stage에 올라간 변경을 되돌아갈 수 있는 기록으로 남긴다.",
    caution: "커밋 전에 `git status`로 들어갈 파일을 확인하고, 메시지는 나중에 읽어도 의도를 알 수 있게 적어라.",
  },
  {
    match: /^git\s+log$/,
    command: "git log",
    analogy: "앨범의 지난 페이지를 넘기며 언제 어떤 사진을 붙였는지 읽는 것이다.",
    useful: "저장소의 시간 기록을 읽고 어떤 커밋으로 돌아갈 수 있는지 확인한다.",
    caution: "아직 커밋이 없으면 로그도 없다. 먼저 add와 commit이 필요하다.",
  },
  {
    match: /^git\s+rebase\b/,
    command: "git rebase",
    analogy: "일기장을 새 순서로 다시 베껴 쓰는 작업이다. 깔끔해지지만 이미 남에게 준 일기장을 바꾸면 혼란이 생긴다.",
    useful: "커밋 순서를 정리하거나 여러 커밋을 더 읽기 좋은 흐름으로 다듬을 때 쓴다.",
    caution: "공유된 브랜치의 기록을 바꾸면 팀원이 꼬일 수 있다. 혼자 쓰는 브랜치에서 조심해서 사용하라.",
  },
  {
    match: /^gh\s+auth\s+refresh\b/,
    speaker: "전령 까치 코리",
    command: "gh auth refresh",
    analogy: "출입증에 새 문을 열 수 있는 도장을 추가로 찍는 일이다.",
    useful: "GitHub CLI 토큰에 필요한 권한을 추가로 부여할 때 쓴다.",
    caution: "권한은 필요한 범위만 추가하라. 실제 계정에서는 토큰 권한이 곧 접근 권한이다.",
  },
  {
    match: /^gh\s+repo\s+create\b/,
    speaker: "전령 까치 코리",
    command: "gh repo create",
    analogy: "하늘 우체국에 내 프로젝트 전용 보관함을 새로 만드는 일이다.",
    useful: "로컬 프로젝트를 올릴 GitHub 저장소를 만들고 origin 연결까지 준비할 수 있다.",
    caution: "public/private 설정과 저장소 이름을 확인하라. 공개 저장소에는 민감한 파일을 올리면 안 된다.",
  },
  {
    match: /^git\s+remote\s+-v$/,
    speaker: "전령 까치 코리",
    command: "git remote -v",
    analogy: "택배 상자에 붙은 배송 주소가 맞는지 확인하는 것이다.",
    useful: "내 로컬 저장소가 어느 GitHub 주소와 연결되어 있는지 확인한다.",
    caution: "origin 주소가 틀리면 다른 저장소로 push할 수 있다.",
  },
  {
    match: /^git\s+push\b/,
    speaker: "전령 까치 코리",
    command: "git push -u origin main",
    analogy: "내 앨범 페이지를 구름 도서관의 같은 책장에 복사해 올리는 일이다.",
    useful: "로컬 커밋을 GitHub의 origin/main으로 올려 백업하고 협업자가 볼 수 있게 만든다. `-u`는 다음 push부터 기본 목적지를 기억하게 한다.",
    caution: "push 전에는 `git status`와 `git log`로 무엇을 올리는지 확인하라. 민감 정보가 커밋되면 push 후 삭제가 까다롭다.",
  },
  {
    match: /^git\s+switch\s+-c\b/,
    command: "git switch -c",
    analogy: "원본 그림 옆에 새 스케치북을 펼쳐 실험을 시작하는 것이다.",
    useful: "새 기능이나 실험을 main과 분리된 브랜치에서 시작할 때 쓴다.",
    caution: "브랜치 이름은 작업 목적이 보이게 짓고, 아직 커밋하지 않은 변경이 섞이지 않았는지 확인하라.",
  },
  {
    match: /^git\s+switch\b/,
    command: "git switch",
    analogy: "여러 스케치북 중 오늘 작업할 책을 바꿔 드는 행동이다.",
    useful: "다른 브랜치로 이동해 작업 맥락을 바꾼다.",
    caution: "커밋하지 않은 변경이 있으면 브랜치 이동 중 충돌하거나 변경이 따라갈 수 있다.",
  },
  {
    match: /^git\s+merge\b/,
    command: "git merge",
    analogy: "두 스케치북의 완성된 그림을 한 책에 합치는 일이다.",
    useful: "다른 브랜치의 작업을 현재 브랜치에 합칠 때 쓴다.",
    caution: "충돌이 나면 파일 내용을 사람이 판단해야 한다. 자동으로 고치려고 서두르지 말고 `status`부터 보라.",
  },
  {
    match: /^rm\s+-rf\s+\.git$/,
    speaker: "사고의 망령 그렘",
    command: "rm -rf .git",
    analogy: "잘못 펼친 시간 장부만 태우는 비상 주문이다. 집 전체를 태우는 주문으로 쓰면 안 된다.",
    useful: "잘못된 위치에 만든 Git 저장소 표시만 제거할 때 쓰는 위험한 복구 명령이다.",
    caution: "실제 터미널에서 `rm -rf`는 매우 위험하다. 경로가 `.git`인지, 현재 위치가 맞는지 반드시 확인하라.",
  },
  {
    match: /^gh\s+pr\s+create\b/,
    speaker: "전령 까치 코리",
    command: "gh pr create",
    analogy: "내 스케치북을 선생님 책상에 올리고 '검토해 주세요' 쪽지를 붙이는 일이다.",
    useful: "브랜치 작업을 리뷰 가능한 Pull Request로 열 때 쓴다.",
    caution: "제목과 본문에는 무엇을 바꿨는지, 어떻게 확인했는지 적어야 리뷰가 빨라진다.",
  },
  {
    match: /^gh\s+pr\s+merge\b/,
    speaker: "전령 까치 코리",
    command: "gh pr merge",
    analogy: "검토가 끝난 스케치북 내용을 반의 공식 작품집에 붙이는 순간이다.",
    useful: "리뷰된 Pull Request를 main에 반영할 때 쓴다.",
    caution: "머지 전 테스트, 리뷰 승인, 충돌 여부를 확인하라. main은 팀의 기준선이다.",
  },
  {
    match: /^npx\b/,
    speaker: "기계 신탁 사서 메모리아",
    command: "npx",
    analogy: "공구를 영구히 사기 전에 공구 대여소에서 한 번 빌려 쓰는 것과 같다.",
    useful: "패키지 실행 도구를 설치 없이 호출하거나 프로젝트 생성 명령을 바로 실행할 때 쓴다.",
    caution: "외부 코드를 실행하는 일이므로 공식 문서의 명령인지, 패키지 이름이 정확한지 확인하라.",
  },
  {
    match: /^curl\b/,
    speaker: "기계 신탁 사서 메모리아",
    command: "curl",
    analogy: "웹 주소로 편지를 보내고 서버가 돌려준 답장을 봉투째 읽는 도구다.",
    useful: "API가 실제로 어떤 응답을 주는지 터미널에서 빠르게 확인할 때 쓴다.",
    caution: "토큰이나 개인 정보가 들어간 요청은 화면 기록과 로그에 남을 수 있다.",
  },
];

const LANGUAGE_CONCEPT_NOTES: {
  match: RegExp;
  command: string;
  analogy: string;
  useful: string;
  caution: string;
}[] = [
  {
    match: /console\.log|print\(/i,
    command: "출력",
    analogy: "컴퓨터에게 생각한 답을 칠판에 적어 보라고 시키는 일이다.",
    useful: "값이 제대로 만들어졌는지 확인하고, 프로그램의 결과를 사용자나 테스트에 보여준다.",
    caution: "정답을 출력할 때는 공백, 줄바꿈, 철자가 하나만 달라도 테스트가 실패할 수 있다.",
  },
  {
    match: /변수|hero_name|const |let | = /i,
    command: "변수",
    analogy: "이름표가 붙은 작은 상자다. 상자에 값을 넣어 두면 이름으로 다시 꺼낼 수 있다.",
    useful: "같은 값을 여러 번 쓰거나, 계산 중간 결과에 의미 있는 이름을 붙일 때 쓴다.",
    caution: "이름은 내용이 보이게 짓고, JavaScript의 `const`처럼 바꿀 수 없는 상자와 `let`처럼 바꿀 수 있는 상자를 구분하라.",
  },
  {
    match: /if |elif|else|조건|validation|validate|locked|CLEAR_MISSION/i,
    command: "조건문",
    analogy: "갈림길 앞의 신호등이다. 상황을 보고 왼쪽 길, 오른쪽 길, 멈춤을 고른다.",
    useful: "입력값, 잠금 상태, 점수, 행동 종류에 따라 프로그램이 다른 선택을 하게 만든다.",
    caution: "조건은 위에서 아래로 검사된다. 더 좁고 중요한 조건을 먼저 확인해야 엉뚱한 길로 빠지지 않는다.",
  },
  {
    match: /for |while|반복|FizzBuzz|range|forEach/i,
    command: "반복문",
    analogy: "우편배달부가 집집마다 같은 규칙으로 편지를 넣는 것과 같다.",
    useful: "목록의 모든 값, 1부터 10까지의 숫자, 여러 기록을 하나씩 처리할 때 쓴다.",
    caution: "시작과 끝 조건을 잘못 잡으면 하나를 빼먹거나 너무 많이 돌 수 있다.",
  },
  {
    match: /function |def |함수|return|make_reply|greet|square|recommend/i,
    command: "함수",
    analogy: "이름을 붙인 자동판매기다. 재료를 넣으면 정해 둔 방식으로 결과를 돌려준다.",
    useful: "같은 일을 여러 번 재사용하고, 복잡한 코드를 작은 약속으로 나눌 수 있다.",
    caution: "`return`은 결과를 돌려주는 것이고, `print/console.log`는 화면에 보여주는 것이다. 둘을 섞어 생각하지 말라.",
  },
  {
    match: /list|리스트|array|배열|scenes|scores|records|nums|arr|\[.*\]/i,
    command: "리스트/배열",
    analogy: "번호가 붙은 기차 칸이다. 첫 칸부터 차례대로 값을 싣고 꺼낼 수 있다.",
    useful: "여러 이름, 점수, 기록, 미션을 순서 있게 묶어 다룰 때 쓴다.",
    caution: "대부분의 언어에서 첫 번째 칸은 1번이 아니라 0번이다.",
  },
  {
    match: /dict|dictionary|딕셔너리|snacks|gifts|get\(|객체|object|JSON\.parse/i,
    command: "객체/딕셔너리",
    analogy: "열쇠와 보물이 짝지어진 보관함이다. 이름이라는 열쇠로 값을 바로 찾는다.",
    useful: "사용자 정보, API 응답, 설정값처럼 여러 속성을 이름으로 읽어야 할 때 쓴다.",
    caution: "없는 열쇠를 바로 열면 오류가 날 수 있다. Python의 `.get()`처럼 기본값을 준비하면 안전하다.",
  },
  {
    match: /filter|map|join|컴프리헨션|comprehension/i,
    command: "고르기와 바꾸기",
    analogy: "체로 필요한 것만 거르고, 도장으로 같은 모양의 이름표를 찍는 과정이다.",
    useful: "많은 기록 중 조건에 맞는 항목만 남기고 화면에 필요한 형태로 바꿀 때 쓴다.",
    caution: "원본을 고르는 단계와 결과 모양을 바꾸는 단계를 분리해서 읽으면 실수가 줄어든다.",
  },
  {
    match: /async|await|Promise/i,
    command: "async/await",
    analogy: "음식을 주문하고 번호표를 들고 기다리는 일이다. 음식이 나오면 다음 행동을 이어 간다.",
    useful: "API, 파일, AI 응답처럼 시간이 걸리는 값을 기다렸다가 자연스러운 순서로 처리한다.",
    caution: "`await`는 `async` 함수 안에서 써야 하며, 기다리는 동안 실패할 가능성도 생각해야 한다.",
  },
  {
    match: /reducer|state|selector|props|component|renderMissionCard/i,
    command: "UI 상태",
    analogy: "게임판의 말 위치와 점수판이다. 행동이 들어오면 규칙에 따라 다음 판으로 바뀐다.",
    useful: "React 앱에서 사용자의 클릭, 미션 완료, 잠금 상태를 화면으로 바꾸는 핵심 감각이다.",
    caution: "상태를 직접 망가뜨리기보다 새 상태를 만들어 돌려주는 습관이 예측 가능한 UI를 만든다.",
  },
  {
    match: /yield|generator|제너레이터/i,
    command: "제너레이터",
    analogy: "책을 통째로 들지 않고 한 장씩 넘겨 주는 도서관 창구다.",
    useful: "큰 데이터나 스트리밍처럼 한 번에 전부 담기 부담스러운 흐름을 조금씩 처리한다.",
    caution: "제너레이터는 필요할 때 다음 값을 만든다. 한 번 소비한 흐름은 다시 처음부터 읽을 수 없을 수 있다.",
  },
  {
    match: /decorator|@|wrapper|데코레이터/i,
    command: "데코레이터",
    analogy: "원래 함수에게 망토를 입혀 입장 검사나 기록 남기기 같은 행동을 덧붙이는 것이다.",
    useful: "로그, 권한 검사, 캐시처럼 여러 함수 앞뒤에 반복되는 일을 깔끔하게 붙인다.",
    caution: "망토가 너무 두꺼우면 원래 함수가 무슨 일을 하는지 읽기 어려워진다.",
  },
  {
    match: /with open|context|컨텍스트|파일/i,
    command: "컨텍스트 매니저",
    analogy: "방에 들어갈 때 열쇠를 받고, 나올 때 자동으로 반납하는 관리자다.",
    useful: "파일처럼 열고 닫아야 하는 자원을 안전하게 정리한다.",
    caution: "파일 경로와 인코딩을 확인하라. 실제 앱에서는 읽기/쓰기 권한도 실패할 수 있다.",
  },
  {
    match: /dataclass|sorted|sort|정렬|slice|reduce/i,
    command: "정렬과 누적",
    analogy: "카드를 점수순으로 줄 세운 뒤 앞에서 몇 장만 골라 합계를 내는 일이다.",
    useful: "추천, 순위, 우선순위, 통계처럼 많은 후보를 비교하고 요약할 때 쓴다.",
    caution: "정렬은 원본 순서를 바꿀 수 있다. JavaScript `sort`는 숫자 비교 함수를 넣어야 안전하다.",
  },
  {
    match: /slice|s\[::-1\]|문자열|reverse/i,
    command: "문자열/슬라이싱",
    analogy: "긴 리본에서 원하는 구간만 자르거나 뒤집어 보는 기술이다.",
    useful: "텍스트의 일부를 꺼내거나 순서를 바꾸고, 로그나 이름을 가공할 때 쓴다.",
    caution: "시작, 끝, 간격의 의미를 작게 예시로 확인하면 헷갈리지 않는다.",
  },
];

const VIM_CONCEPT_NOTES: {
  match: RegExp;
  command: string;
  analogy: string;
  useful: string;
  caution: string;
}[] = [
  {
    match: /h j k l|hjkl|\$|0|gg|G|:\{n\}|:5|이동|점프|보법/i,
    command: "Vim 이동",
    analogy: "마우스를 쓰지 않고 검 끝을 원하는 칸으로 옮기는 발놀림이다.",
    useful: "커서를 빠르게 옮겨 수정할 위치에 정확히 도착한다.",
    caution: "Vim은 모드가 중요하다. 이동하려면 먼저 `Esc`로 Normal 모드에 있어야 한다.",
  },
  {
    match: /dd|dw|x|삭제|베기|잘라/i,
    command: "Vim 삭제",
    analogy: "가위의 크기를 고르는 일이다. `x`는 한 글자, `dw`는 단어, `dd`는 한 줄이다.",
    useful: "필요 없는 글자, 단어, 줄을 빠르게 제거한다.",
    caution: "대상을 먼저 확인하라. 그래도 실수했다면 `u`로 되돌리는 습관을 들여라.",
  },
  {
    match: /i · a · o|Insert|입력|I |A | o | O /i,
    command: "Vim 입력",
    analogy: "검을 내려놓고 붓을 드는 순간이다. 이제 움직임이 아니라 글자가 들어간다.",
    useful: "현재 위치 앞뒤나 새 줄에 텍스트를 추가한다.",
    caution: "입력이 끝나면 `Esc`로 다시 Normal 모드에 돌아와야 다음 명령을 쓸 수 있다.",
  },
  {
    match: /cw|변경|갈아/i,
    command: "Vim 변경",
    analogy: "낡은 표지판을 떼어내자마자 새 표지판을 쓰는 한 동작이다.",
    useful: "단어를 지우고 바로 새 단어를 입력할 때 키 입력을 줄인다.",
    caution: "변경 범위를 잘못 잡으면 예상보다 많이 지워질 수 있다.",
  },
  {
    match: /yy|붙여넣기|복사| p|yank/i,
    command: "Vim 복사/붙여넣기",
    analogy: "도장을 찍기 위해 원본 무늬를 한 번 떠 두는 것이다.",
    useful: "반복되는 줄이나 문장을 빠르게 복제한다.",
    caution: "`p`는 현재 위치 뒤에 붙는다. 붙을 위치를 먼저 확인하라.",
  },
  {
    match: /u · \.|되돌리기|반복|직전/i,
    command: "Vim 되돌리기/반복",
    analogy: "`u`는 시간을 한 칸 되감는 버튼이고, `.`은 방금 한 동작을 다시 누르는 버튼이다.",
    useful: "실수를 복구하고 같은 편집을 빠르게 반복한다.",
    caution: "반복은 강력하지만, 현재 커서 위치가 달라지면 결과도 달라진다.",
  },
  {
    match: /Visual|비주얼|V |v |선택/i,
    command: "Vim 선택",
    analogy: "형광펜으로 범위를 칠한 뒤 한 번에 자르는 방식이다.",
    useful: "여러 줄이나 특정 범위를 눈으로 확인하며 편집한다.",
    caution: "선택 범위가 어디까지인지 보고 `d`, `>` 같은 동작을 실행하라.",
  },
  {
    match: /f\{|f |t\{|문자 점프|표적/i,
    command: "Vim 문자 점프",
    analogy: "멀리 있는 표적 글자를 보고 그 자리로 단숨에 뛰는 기술이다.",
    useful: "긴 줄 안에서 원하는 문자 근처로 빠르게 이동한다.",
    caution: "찾을 문자가 현재 줄에 없으면 움직이지 않는다.",
  },
  {
    match: /%|괄호|쌍/i,
    command: "Vim 괄호 매칭",
    analogy: "열린 문과 닫힌 문을 한 쌍으로 찾아 순간이동하는 것이다.",
    useful: "함수, 조건문, 객체처럼 괄호로 묶인 코드 구조를 빠르게 파악한다.",
    caution: "괄호가 깨져 있으면 짝을 찾지 못한다. 구조 오류를 의심하라.",
  },
  {
    match: />|들여쓰기|자세/i,
    command: "Vim 들여쓰기",
    analogy: "문장들을 줄 맞춰 세우는 정렬 훈련이다.",
    useful: "코드 블록의 구조를 읽기 쉽게 만든다.",
    caution: "선택 범위를 잘못 잡으면 원하지 않는 줄까지 밀릴 수 있다.",
  },
  {
    match: /qa|@a|매크로/i,
    command: "Vim 매크로",
    analogy: "내 손동작을 녹음해 작은 조수에게 반복 재생시키는 것이다.",
    useful: "비슷한 수정이 여러 줄에 반복될 때 시간을 크게 줄인다.",
    caution: "첫 동작이 틀리면 틀린 행동도 그대로 반복된다. 한 줄에서 먼저 검증하라.",
  },
  {
    match: /:%s|검색치환|치환|STATUS/i,
    command: "Vim 검색치환",
    analogy: "문서 전체에 같은 오타 스티커를 찾아 새 스티커로 한 번에 갈아 붙이는 일이다.",
    useful: "반복되는 단어, 접두사, 패턴을 파일 전체에서 빠르게 바꾼다.",
    caution: "범위와 패턴을 너무 넓게 잡으면 바꾸면 안 되는 글자까지 바뀐다.",
  },
];

function codeFromHint(hint?: string): string | null {
  if (!hint) return null;
  return hint.match(/`([^`]+)`/)?.[1] ?? null;
}

function commandsForStep(step: MissionStep): string[] {
  if (step.kind === "terminal-chain") {
    return step.objectives
      .map((objective) => codeFromHint(objective.hint))
      .filter((command): command is string => Boolean(command));
  }
  if (step.kind === "terminal") {
    return [codeFromHint(step.hint)].filter((command): command is string => Boolean(command));
  }
  return [];
}

function noteForCommand(command: string, fallbackSpeaker: string): CoachNote {
  const note = COMMAND_NOTES.find((entry) => entry.match.test(command));
  if (note) {
    return {
      speaker: note.speaker ?? fallbackSpeaker,
      command: note.command,
      analogy: note.analogy,
      useful: note.useful,
      caution: note.caution,
    };
  }
  return {
    speaker: fallbackSpeaker,
    command,
    analogy: "처음 보는 주문은 레시피의 한 줄이라고 생각하라. 재료가 무엇이고 결과가 무엇인지부터 읽으면 덜 무섭다.",
    useful: "이 주문은 현재 미션의 목표 상태를 만들기 위한 핵심 동작이다. 입력하기 전에는 지금 위치와 대상 파일을 먼저 확인하라.",
    caution: "힌트를 그대로 따라가되, 실제 터미널에서는 명령이 어느 폴더와 파일에 적용되는지 확인해야 한다.",
  };
}

function textForStep(step: MissionStep): string {
  if (step.kind === "terminal-chain") {
    return [step.briefing, step.hint, ...step.objectives.flatMap((o) => [o.label, o.hint])].join("\n");
  }
  if (step.kind === "terminal") return [step.briefing, step.hint].join("\n");
  if (step.kind === "language") {
    return [step.briefing, step.hint, step.starterCode, step.languageId].join("\n");
  }
  if (step.kind === "vim") return [step.briefing, step.hint, step.initialText].join("\n");
  if (step.kind === "react-lab") return [step.briefing, step.hint, step.labKind].join("\n");
  return "";
}

function conceptNoteForStep(
  step: MissionStep,
  speaker: string,
  entries: typeof LANGUAGE_CONCEPT_NOTES
): CoachNote | null {
  const text = textForStep(step);
  const note = entries.find((entry) => entry.match.test(text));
  if (!note) return null;
  return { speaker, ...note };
}

function notesForStep(mission: Mission, step: MissionStep): CoachNote[] {
  const fallbackSpeaker = FALLBACK_BY_REALM[mission.realmId] ?? "기계 신탁 사서 메모리아";
  if (step.kind === "terminal" || step.kind === "terminal-chain") {
    const seen = new Set<string>();
    return commandsForStep(step)
      .map((command) => noteForCommand(command, fallbackSpeaker))
      .filter((note) => {
        const key = `${note.speaker}:${note.command}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 4);
  }

  if (step.kind === "language") {
    const speaker = mission.realmId === "storybook" ? "사서장 세렌" : "글자드래곤 알파베타스";
    const conceptNote = conceptNoteForStep(step, speaker, LANGUAGE_CONCEPT_NOTES);
    if (conceptNote) return [conceptNote];
    return [
      {
        speaker,
        command: step.languageId === "javascript" ? "JavaScript 연습" : "Python 연습",
        analogy: step.languageId === "javascript"
          ? "JavaScript는 무대 뒤 조명 기사 같다. 버튼을 누르면 화면과 데이터가 바로 반응하게 만든다."
          : "Python은 이야기꾼의 공책 같다. 생각한 절차를 위에서 아래로 또박또박 적으면 컴퓨터가 따라 읽는다.",
        useful: "문법을 외우는 단계가 아니라 데이터를 읽고, 바꾸고, 검증하는 작은 문제 해결 단위를 익히는 단계다.",
        caution: "정답 출력만 맞추기보다 변수 이름, 조건, 반복의 흐름을 말로 설명할 수 있어야 다음 미션이 쉬워진다.",
      },
    ];
  }

  if (step.kind === "vim") {
    const conceptNote = conceptNoteForStep(step, "검사부 카엘", VIM_CONCEPT_NOTES);
    if (conceptNote) return [conceptNote];
    return [
      {
        speaker: "검사부 카엘",
        command: "Vim 조작",
        analogy: "Vim은 검술 자세와 같다. 손이 모양을 기억하면 멀리 움직이지 않고도 빠르게 베고 고친다.",
        useful: "서버, Git 커밋 메시지, 설정 파일처럼 마우스가 불편한 환경에서 빠르게 텍스트를 고칠 때 쓰인다.",
        caution: "명령 모드와 입력 모드를 구분하라. 막히면 `Esc`로 명령 모드로 돌아오는 습관이 중요하다.",
      },
    ];
  }

  if (step.kind === "react-lab") {
    const noteByKind: Record<typeof step.labKind, CoachNote> = {
      "component-props": {
        speaker: "글자드래곤 알파베타스",
        command: "React props",
        analogy: "컴포넌트는 와플 기계이고 props는 반죽과 토핑이다. 같은 기계도 재료가 다르면 다른 와플이 나온다.",
        useful: "같은 화면 조각을 여러 데이터로 재사용할 수 있게 만든다.",
        caution: "props는 부모가 건네준 값이다. 자식이 마음대로 바꾸기보다 받은 값으로 그리는 데 집중하라.",
      },
      "state-event": {
        speaker: "글자드래곤 알파베타스",
        command: "React state/event",
        analogy: "state는 방의 전등 스위치이고 event는 손가락이다. 클릭하면 스위치가 바뀌고 방의 모습이 달라진다.",
        useful: "버튼 클릭, 입력, 완료 같은 사용자 행동에 화면이 반응하게 만든다.",
        caution: "상태 변경은 이전 값을 기준으로 일어날 수 있다. 여러 번 누르는 경우를 생각하라.",
      },
      "conditional-render": {
        speaker: "글자드래곤 알파베타스",
        command: "조건부 렌더링",
        analogy: "무대 감독이 장면에 맞는 배우만 무대 위로 올리는 일이다.",
        useful: "잠금, 로딩, 오류, 힌트처럼 상태에 따라 다른 화면을 보여준다.",
        caution: "조건이 false일 때 무엇이 보이지 않아야 하는지도 함께 확인하라.",
      },
      "import-export": {
        speaker: "글자드래곤 알파베타스",
        command: "import/export",
        analogy: "도서관에서 책을 분류해 꽂고, 필요한 방에서 정확한 책을 빌려 오는 규칙이다.",
        useful: "컴포넌트를 파일별로 나누고 필요한 곳에서 재사용하게 한다.",
        caution: "이름 내보내기와 기본 내보내기를 섞으면 import 문이 쉽게 틀린다.",
      },
    };
    return [noteByKind[step.labKind]];
  }

  return [];
}

function CoachAvatar({ speaker }: { speaker: string }) {
  const src = npcImageFor(speaker);
  return (
    <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-accent/30 bg-surface-strong ring-1 ring-accent/20">
      {src ? (
        <Image src={src} alt={speaker} fill sizes="56px" className="object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center text-xl">?</div>
      )}
    </div>
  );
}

export function NpcCoachPanel({ mission, step }: Props) {
  const notes = notesForStep(mission, step);
  if (notes.length === 0) return null;
  const lead = notes[0];

  return (
    <section className="parchment p-5">
      <div className="flex items-start gap-4">
        <CoachAvatar speaker={lead.speaker} />
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-widest text-muted">NPC 조언</div>
          <div className="mt-1 fantasy-title text-sm text-accent">{lead.speaker}</div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {notes.map((note) => (
              <article
                key={`${note.speaker}-${note.command}`}
                className="rounded-lg border border-border/70 bg-surface/40 p-3"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Lightbulb className="size-4 text-accent" />
                  <code className="font-mono text-accent">{note.command}</code>
                </div>
                <div className="mt-2 flex items-start gap-2 rounded-md border border-accent/20 bg-accent/10 px-2.5 py-2 text-sm leading-relaxed text-accent-strong">
                  <MessageCircle className="mt-0.5 size-3.5 shrink-0" />
                  <span>{note.analogy}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{note.useful}</p>
                <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-amber-100/90">
                  {note.caution.includes("위험") || note.caution.includes("민감") ? (
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-300" />
                  ) : (
                    <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />
                  )}
                  <span>{note.caution}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
