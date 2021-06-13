import { File, Folder } from '@nativescript/core/file-system';
const downloads_path = "/storage/emulated/0/Download";

export const output_path = downloads_path + "/.izpm-viewer/output";

export const member_name_dict = {
  "장원영": 0, "チャン・ウォニョン": 0,
  "미야와키 사쿠라": 1, "宮脇咲 良": 1, "宮脇咲良": 1,
  "조유리": 2, "チョ・ユリ": 2,
  "최예나": 3, "チェ・イェナ": 3,
  "안유진": 4,
  "야부키 나코": 5, "矢吹奈子": 5, 
  "권은비": 6, "クォン・ウンビ": 6, 
  "강혜원": 7, "カン・へウォン": 7, 
  "혼다 히토미": 8, "本田仁美": 8, 
  "김채원": 9, "キム・チェウォン": 9, 
  "김민주": 10, "キム・ミンジュ": 10, 
  "이채연": 11, "イ・チェヨン": 11, 
  "운영팀": 12, 
  "오리예나": 3, "월클토미": 8, "김민주 앤젤": 10, "쌈무": 9, "광배": 7, "깃털채연": 11};

export const test_member_profile = {
  "장원영": "https://izone-mail.com/img/members/1_gkPY2N3/s.png?_=undefined",
  "안유진": "https://izone-mail.com/img/members/5_ZYB4eu5/s.png?_=undefined",
  "조유리": "https://izone-mail.com/img/members/3_yo9Y9CS/s.png?_=undefined",
  "혼다 히토미": "https://izone-mail.com/img/members/9_0sRGq7K/s.png?_=undefined",
  "야부키 나코": "https://izone-mail.com/img/members/6_y7AXxJ6/s.png?_=undefined",
  "김민주": "https://izone-mail.com/img/members/11_m8tIGW8/s.png?_=undefined",
  "김채원": "https://izone-mail.com/img/members/10_6DylMA6/s.png?_=undefined",
  "이채연": "https://izone-mail.com/img/members/12_GzP40wZ/s.png?_=undefined",
  "최예나": "https://izone-mail.com/img/members/4_n4R2YDw/s.png?_=undefined",
  "강혜원": "https://izone-mail.com/img/members/8_2eKPTy5/s.png?_=undefined",
  "미야와키 사쿠라": "https://izone-mail.com/img/members/2_ql7A7OR/s.png?_=undefined",
  "권은비": "https://izone-mail.com/img/members/7_A2WviW3/s.png?_=undefined",
}
const MEMBER_LIST: Member[] = [
  "장원영", "미야와키 사쿠라", "조유리", "최예나",
  "안유진", "야부키 나코", "권은비", "강혜원",
  "혼다 히토미", "김채원", "김민주", "이채연"
]

export const n_to_member: Map<number, Member> = new Map(MEMBER_LIST.map((v, i)=> [i, v]))
	
export const get_member_name = (nick: string) => n_to_member.get(member_name_dict[nick]);

export const get_json = (file_path: string) => JSON.parse(File.fromPath(output_path + file_path).readTextSync())

function get_pm_list(){
  if(! Folder.exists(output_path)){
    return test_pm_list;
  }

  const raw_pm_list = get_json("/pm_list.json");
  const mail_body_dict = get_json("/mail_body_dict.json");

  return raw_pm_list.map((pm: MailT)=> ({
    ...pm,
    member: get_member_name(pm.member),
    body: mail_body_dict[pm.id].body,
    images: mail_body_dict[pm.id].images
  }))
}

export const pm_list: MailT[] = get_pm_list();

export const test_pm_list: MailT[] = [
  {
    "id": "t0012",
    "member": "장원영",
    "subject": "뭐하고 있어?",
    "preview": "오늘 날씨가 너무 좋길래 메일 보냈어ㅎㅎ 뭐하고 있어요?",
    "time": "2019/01/09 12:01",
    "body": `<p>오늘 날씨가 너무 좋길래 메일 보냈어ㅎㅎ 뭐하고 있어요?</p>
    <p>나는 지금 언니들이랑 다같이 모여 있어!! 맛있는 것도 먹었지✌🏻 너무 보고싶은데..어디 있는거야!😆 </p>
    <p>오늘도 힘내☺️</p>
    {이미지} `,
    "images": ["https://izone-mail.com/img/members/1_gkPY2N3/mail/1.jpg"]
  },
  {
    "id": "t0011",
    "member": "안유진",
    "subject": "ㅎㅎ",
    "preview": "엥 왜이렇게 부었지이 ㅜㅜ",
    "time": "2019/01/09 12:01",
    "body": `<p>엥 왜이렇게 부었지이 ㅜㅜ</p>
    <p>사실 이거 오늘 아니구 ㅋㅋㅋㅋㅋㅋ</p>
    <p>피에스타 활동 때 지롱</p>
    <p>엠카운트다운 가는 날이었는데</p>
    <p>갑자기 닭강정 먹고싶어서</p>
    <p>먹다가 셀카를 찍는데 참 볼이 만져보고싶게 생겨서</p>
    <p>ㅋㅋㅋㅌㅋㅌㅌㅌ</p>
    <p>보여줄려구요 ㅎㅎ</p>
    <p>저 때 닭강정 맛있었는뎅</p>
    <p>하지만 항상 닭강정이랑 치킨이랑 고민하다가</p>
    <p>치킨을 시켜먹지.. 항상 ㅋㅋㅋㅋ..</p>
    <p>치킨을 이길 수는 없는 거 같아요</p>
    <p>헤헤</p> {이미지} 
    <br>`,
    "images": ["https://izone-mail.com/img/members/5_ZYB4eu5/mail/1.jpg"]
  },
  {
    "id": "t0010",
    "member": "조유리",
    "subject": "🥄",
    "preview": "위즈원 모해율~~~~ 밥 먹었어요!???",
    "time": "2019/01/09 12:01",
    "body": `<p>위즈원 모해율~~~~</p>
      <p>밥 먹었어요!???</p>
      <p>아직 안드셨으면 제가 메뉴 추천 해드릴게여ㅎㅎㅎ</p>
      <p>으으음 뭐가 좋을까나~</p>
      <p>그래 ! 유부우동 어때요!!!!!</p>
      <p>제가 요즘 우동에 빠져있거덩요 ㅋㅋㅋㅋㅋㅋㅋ</p>
      <p>아 아니다 든든하게 면 말고 밥 먹어요 밥</p>
      <p>김치볶음밥 드세요 김치볶음밥!!!!</p>
      <p>율 추천 메뉴로 든든하게 식사 하시고 오늘 하루도 파이팅!!</p>
      <p>유리가 위즈원의 하루를 응원할게요❤️❤️</p>
      {이미지}<br>`,
    "images": ["https://izone-mail.com/img/members/3_yo9Y9CS/mail/1.jpg"]
  },
  {
    "id": "t0009",
    "member": "혼다 히토미",
    "subject": "🍞🍞🍞",
    "preview": " こんにちは🌞  ひいだよ🍓",
    "time": "2019/01/09 12:01",
    "body": `<p>こんにちは🌞</p>
      <p>ひいだよ🍓</p>
      {이미지}
      <p>ひょこっ🙂</p>
      <p>いま何してるの〜🤔？？</p>
      <p>ひいは運動して疲れたので</p>
      <p>今はベッドで横になりながら</p>
      <p>オシャレなカフェを調べてました🔍笑</p>
      <p>こういうのって本当に</p>
      <p>何時間でも調べてられる😳😳😳</p><br>
      <p>最近はギリシャヨーグルトにハマってるので</p>
      <p>ヨーグルトボールが食べられるお店を</p>
      <p>よく調べます💐</p><br>
      <p>行きたいな〜って思ったところを</p>
      <p>たくさんスクショしておくんだけど</p>
      <p>結局行ったことあるのって本当にわずか😂</p>
      <p>いつか車の免許取ったら</p>
      <p>ドライブしながらカフェ巡りしたいな☕️🍰</p><br>
      <p>あとひいはいつもカフェに行ったら</p>
      <p>だいたいコーヒーしか飲まないので</p>
      <p>今度は違うのも頼んでみようと思う😂</p><br>
      <p>カフェに行くと</p>
      <p>どんな飲み物を頼みますか？？</p><br>
      <p>そろそろお腹すいてきたから</p>
      <p>ご飯食べよっと🍽</p><br>
      <p>なに食べようか決められないから</p>
      <p>優柔不断な私に何かオススメして〜🥺笑</p><br>
      <p>じゃあまたねっ</p><br>
      <p>안뇽🖐🏻</p>
      <p>뭐하고 있었오~???</p>
      <p>메일 기다리고 있었지??ㅎㅎㅎ</p><br>
      <p>아까 운동갔다 왔는데 오늘 넘 힘들었어요ㅠ</p>
      <p>그래도 열심히 했어요💪🏻💪🏻💪🏻</p>
      <p>칭찬해줘🥺ㅋㅋㅋ</p><br>
      <p>밥은 먹었나요???</p>
      <p>저는 아직인데...</p>
      <p>뭐 먹을까 고민중💭</p><br>
      <p>근데 오늘 기분은 면보다 빵!!!</p><br>
      <p>샌드위치 먹을까~🤔🤔</p><br>
      <p>아 오랜만에 토스트 먹고싶다🍞🍞🍞</p><br>
      <p>어떤 토스트를 좋아해요???</p><br>
      {이미지}
      <p>ピンクだった頃の写真が</p>
      <p>出てきたよぉぉぉお😳😳😳</p>
      <p>またこの色にしたい😢</p>
      <p>ばいばーい👋🏻</p>
      <p>ひいまる🥟</p>
      <br>`,
    "images": [
      "https://izone-mail.com/img/members/9_0sRGq7K/mail/1.jpg",
      "https://izone-mail.com/img/members/9_0sRGq7K/mail/2.jpg"
    ],
  },
  {
    "id": "t0008",
    "member": "야부키 나코",
    "subject": "なこめ♡나코메일",
    "preview": "안녕~~ 일어났당~~~ 오늘은 뭐해요~??",
    "time": "2019/01/09 12:01",
    "body": `<p>안녕~~ 일어났당~~~</p>
      <p>오늘은 뭐해요~??</p>
      <p>난 날씨가 좋으니까 밖에 나가려구 ㅎㅎ</p>
      <p>아직 이불안에 있지만..ㅋㅋㅋㅋㅋ</p> <br>
      <p>おはよう〜☀︎　起きたよん😊</p>
      <p>今日は何するのー？？</p>
      <p>なこは、天気いいから外出ようかな〜って思ってる😆</p>
      <p>まだベットの中だけど…😱笑笑</p><br>
      <p> 아직 내가 보라머리 때 사진 ㅎㅎ</p>
      <p>まだ髪の毛が紫の時の写真😚</p><br>
      {이미지}<br>`,
    "images": ["https://izone-mail.com/img/members/6_y7AXxJ6/mail/1.jpg"]
  },
  {
    "id": "t0007",
    "member": "김민주",
    "subject": "밍모닝",
    "preview": "좋은 아침!!! 푹 잤어요?! 나아는 너를 위해 하트를 만들어봤어🤗",
    "time": "2019/01/09 12:01",
    "body": `<br>{이미지}
      <p>좋은 아침!!! 푹 잤어요?!</p>
      <p>나아는 너를 위해 하트를 만들어 봤어 🤗</p>
      <p>헿 오늘도 우리 파이팅 해 보아용</p>
      <p>おはよう！ よく眠った？</p>
      <p>このハートは君のためにがんばって作った🤗</p>
      <p>今日もファイティン!!💕💕</p>`,
    "images": ["https://izone-mail.com/img/members/11_m8tIGW8/mail/1.jpg"]
  },
  {
    "id": "t0006",
    "member": "김채원",
    "subject": "안녕",
    "preview": "나는 오늘 김치찌개 먹을 거야 너는 뭐 먹을거얌",
    "time": "2019/01/09 12:01",
    "body": `<p>나는 오늘 김치찌개 먹을거야</p>
      <p>너는 뭐 먹을거얌</p>
      <p>먹을 때가 제일 행복해😄😄</p>
      {이미지}<br>`,
    "images": ["https://izone-mail.com/img/members/10_6DylMA6/mail/1.jpg"]
  },
  {
    "id": "t0005",
    "member": "이채연",
    "subject": "머리 아파🚨",
    "preview": "나는 오늘 김치찌개 먹을 거야 너는 뭐 먹을거얌",
    "time": "2019/01/09 12:01",
    "body": ` {이미지}
      <p>하루 종일 1분 1초 계속 하염없이 꾸준히 열심히</p>
      <p>네 생각 많이 했더니...</p>
      <p>보고 싶으니까</p>
      <p>얼른</p>
      <p>꿈에 나타나주세용꼬리 용 용</p>
      <p>자!  저기 밑에 (인)에다가 싸인해주시죠🤔</p>
      <p>아 뭐.. 특별한 건 아니구</p>
      <p>꿈에서 만나자는 약속의 의미인데</p>
      <br>
      <p>못 만나면 이채연에게</p>
      <p>가볍게 하트 111개 정도 날리면</p>
      <p>OK 봐드릴게요</p>
      <p><span style="text-align: right;display: block;">(인)</span></p>
      {이미지}
      <p>지금 딱 나의 표정...</p>
      <p>도망가야지..</p>
      <br>
      <br>
      <br>
      <p>안녕🐾</p>`,
    "images": [
      "https://izone-mail.com/img/members/12_GzP40wZ/mail/1.jpg",
      "https://izone-mail.com/img/members/12_GzP40wZ/mail/2.jpg",
    ]
  },
  {
    "id": "t0004",
    "member": "최예나",
    "subject": "안녕",
    "preview": "브이✌️",
    "time": "2019/01/09 12:01",
    "body": `브이✌️{이미지} <br>`,
    "images": [
      "https://izone-mail.com/img/members/4_n4R2YDw/mail/1.jpg",
    ]
  },
  {
    "id": "t0003",
    "member": "강혜원",
    "subject": "지금 내 모습",
    "preview": "| 벌써 저녁임?　　|",
    "time": "2019/01/09 12:01",
    "body": ` {이미지}<br>
      　　　| 벌써 저녁임?　　|<br>
      　　　＼　　　　　　　/<br>
      　　　　￣￣￣￣∨￣￣<br>
      　　　　　　　。<br>
      　　　∧ ∧　.?　<br>
      |￣￣( ´Д｀)￣|<br>
      |＼⌒⌒⌒⌒⌒⌒＼<br>
      |　 ＼⌒⌒⌒⌒⌒⌒＼<br>
      ＼　｜⌒⌒⌒⌒⌒⌒⌒|<br>
      　 ＼|＿＿＿＿＿＿＿_|<br>
      <br>`,
    "images": [
      "https://izone-mail.com/img/members/8_2eKPTy5/mail/1.jpg",
    ]
  },
  {
    "id": "t0002",
    "member": "미야와키 사쿠라",
    "subject": "🥺",
    "preview": "何してるの？ 私は、キムチチゲを食べるか〜 キムチチゲを食べるか〜キムチチゲを食べるか〜",
    "time": "2019/01/09 12:01",
    "body": `<br> {이미지} <br>  何してるの？<br>   <br>
      私は、キムチチゲを食べるか〜<br>
      キムチチゲを食べるか〜<br>
      キムチチゲを食べるか〜<br>
      悩み中🙄笑<br> <br> <br>
      あ〜<br> 早く会えたらいいね😊<br> <br> <br>
      뭐해..?<br> <br>
      난 김치찌개 먹을까<br>
      김치찌개 먹을까<br>
      김치찌개 먹을까<br>
      고민 중 🙄ㅎㅎㅎㅎ<br>
      <br> 흠 ...<br> 빨리 볼수 있으면 좋겠다 😊<br><br>`,
    "images": [
      "https://izone-mail.com/img/members/2_ql7A7OR/mail/1.jpg",
    ]
  },
  {
    "id": "t0001",
    "member": "권은비",
    "subject": "모하구 있어요오?",
    "preview": "나는 오랜만에 앞머리를 내려봤어요  어땡 ?!?!🤭 귀엽다공..? ㅎ 고마워 너도 귀여워 !",
    "time": "2019/01/09 12:01",
    "body": `<br>나는 오랜만에 앞머리를 내려봤어요<br>
      어땡 ?!?!🤭 귀엽다공..? ㅎ 고마워 너도 귀여워 !<br>
      오늘은 진짜 맛있는 음식을 먹을거야 먹는건 행복한 일이니까아아아아아아아<br><br>{이미지}<br>   
      {이미지}<br><br>`,
    "images": [
      "https://izone-mail.com/img/members/7_A2WviW3/mail/1.jpg",
      "https://izone-mail.com/img/members/7_A2WviW3/mail/2.jpg"
    ]
  },
];

export const member_color_dict = {
		0:"#d9598c",
		1:"#f1d2e7",
		2:"#f3aa51",
		3:"#fcf695",
		4:"#567ace",
		5:"#b7d3e9",
		6:"#bbb0dc",
		7:"#db706c",
		8:"#f1c3aa",
		9:"#cee5d5",
		10: "#fff",
		11:"#a7e0e1"
}
