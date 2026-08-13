import type {
  PrototypeAgeBand,
  PrototypeJoiningTime,
  PrototypeProfile,
} from "@/types/profile-prototype";

export const syntheticProfileFixture: PrototypeProfile = {
  annualSpend: 1_200_000,
  usageByCategory: {
    convenience: 180_000,
    supermarket: 420_000,
    online: 240_000,
  },
  frequentServiceIds: ["convenience-daily24", "supermarket-mainichi", "online-kurashi"],
  ageBand: "30s",
  joiningTime: "within-three-months",
  pointPreferenceIds: ["common-points", "cashback"],
};

export const ageBandOptions: ReadonlyArray<{
  id: PrototypeAgeBand;
  label: string;
}> = [
  { id: "18-19", label: "18–19歳" },
  { id: "20s", label: "20代" },
  { id: "30s", label: "30代" },
  { id: "40s", label: "40代" },
  { id: "50s", label: "50代" },
  { id: "60plus", label: "60代以上" },
  { id: "prefer-not-to-answer", label: "回答しない" },
];

export const joiningTimeOptions: ReadonlyArray<{
  id: PrototypeJoiningTime;
  label: string;
}> = [
  { id: "within-one-month", label: "1か月以内" },
  { id: "within-three-months", label: "3か月以内" },
  { id: "within-six-months", label: "半年以内" },
  { id: "undecided", label: "時期未定" },
];

export const pointPreferenceOptions = [
  {
    id: "common-points",
    label: "共通ポイント（合成）",
    description: "買い物や支払いに幅広く使える想定",
  },
  {
    id: "miles",
    label: "マイル（合成）",
    description: "旅行や航空券への交換を重視する想定",
  },
  {
    id: "cashback",
    label: "キャッシュバック",
    description: "請求額への充当を優先する想定",
  },
  {
    id: "digital-balance",
    label: "電子マネー残高（合成）",
    description: "日常の支払いへすぐ使う想定",
  },
  {
    id: "none",
    label: "特に希望なし",
    description: "交換先を指定せずに候補を探す",
  },
] as const;
