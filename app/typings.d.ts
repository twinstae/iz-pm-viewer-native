type Member = "장원영" | "안유진"| "조유리" |
  "혼다 히토미" | "야부키 나코" | "김민주" |
  "김채원" | "이채연" | "최예나" |
  "강혜원" | "미야와키 사쿠라" | "권은비";

type MailT = {
  id: string;
  member: Member;
  subject: string;
  preview: string;
  time: string;
  body: string;
  images: string[];
}

type TagT = {
  value: string;
  color: string;
}
