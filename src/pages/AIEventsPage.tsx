import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import image from "../assets/image.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/toast";
import {
  Search,
  Brain,
  Activity,
  AlertTriangle,
  Heart,
  MessageSquare,
  Clock,
  Mic,
  Thermometer,
  Pill,
  Footprints,
  Cpu,
  Camera,
  MapPin,
  Sparkles,
  X,
  CheckCircle2,
  Hash,
  ShieldCheck,
  ChevronRight,
  Eye,
  Sliders,
} from "lucide-react";
import { cn, formatDateTime, getInitials, timeAgo } from "@/lib/utils";

interface AIEvent {
  id: string;
  type: AIEventType;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  details: string;
  elderId: string;
  elderName: string;
  elderAvatar?: string;
  room: string;
  age?: number;
  confidence: number;
  timestamp: string;
  status: "pending" | "reviewed";
  deviceId: string;
  deviceName: string;
  snapshot?: string;
  snapshotCaption?: string;
  signals?: { label: string; value: string; tone: "good" | "warn" | "bad" }[];
  model?: string;
  modelVersion?: string;
  acknowledgedBy?: string;
}

type AIEventType =
  | "fall"
  | "abnormal_heart"
  | "activity"
  | "face_recognition"
  | "sos"
  | "medication"
  | "wander"
  | "vital"
  | "voice"
  | "thermal";

const eventTypeConfig: Record<
  AIEventType,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  fall: {
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/20",
    label: "Té ngã",
  },
  abnormal_heart: {
    icon: Heart,
    color: "text-orange-500",
    bg: "bg-orange-500/10 border-orange-500/20",
    label: "Nhịp tim",
  },
  activity: {
    icon: Activity,
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
    label: "Hoạt động",
  },
  face_recognition: {
    icon: Brain,
    color: "text-purple-500",
    bg: "bg-purple-500/10 border-purple-500/20",
    label: "Nhận diện",
  },
  sos: {
    icon: MessageSquare,
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/20",
    label: "SOS",
  },
  medication: {
    icon: Pill,
    color: "text-sky-500",
    bg: "bg-sky-500/10 border-sky-500/20",
    label: "Uống thuốc",
  },
  wander: {
    icon: Footprints,
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
    label: "Đi lang thang",
  },
  vital: {
    icon: Activity,
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
    label: "Sinh tồn",
  },
  voice: {
    icon: Mic,
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/20",
    label: "Kêu cứu",
  },
  thermal: {
    icon: Thermometer,
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/20",
    label: "Nhiệt độ",
  },
};

const severityConfig = {
  critical: {
    label: "Critical",
    classes: "bg-red-500/10 text-red-500 border-red-500/30",
  },
  warning: {
    label: "Warning",
    classes: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  },
  info: {
    label: "Info",
    classes: "bg-sky-500/10 text-sky-500 border-sky-500/30",
  },
};

const statusConfig = {
  pending: {
    label: "Chờ xử lý",
    classes: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  },
  reviewed: {
    label: "Đã xem",
    classes: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  },
};

const aiEvents: AIEvent[] = [
  {
    id: "EV-2401",
    type: "fall",
    severity: "critical",
    title: "Phát hiện té ngã trong phòng",
    description: "Camera AI phát hiện tư thế té ngã với độ tin cậy 98.5%",
    details:
      "Tại thời điểm 14:32:18, hệ thống Vision AI phát hiện chuyển động bất thường kết hợp tư thế nằm sàn trong phòng 201. Bounding box khoanh vùng người cao tuổi với confidence 98.5%. Hệ thống đã tự động phát loa cảnh báo và gửi thông báo tới 3 người thân trong vòng 5 giây.",
    elderId: "1",
    elderName: "Nguyễn Thị Lan",
    elderAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop",
    age: 78,
    room: "201",
    confidence: 98.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    status: "pending",
    deviceId: "CAM-001",
    deviceName: "Camera Phòng 201",
    snapshot: image,
    snapshotCaption: "AI bounding box khoanh vùng người cao tuổi",
    signals: [
      { label: "Pose score", value: "0.94", tone: "bad" },
      { label: "Motion delta", value: "2.4 m/s", tone: "bad" },
      { label: "Floor contact", value: "YES", tone: "bad" },
      { label: "Duration", value: "0.8s", tone: "warn" },
    ],
    model: "OmniCare-Vision",
    modelVersion: "v3.2.1",
  },
  {
    id: "EV-2402",
    type: "abnormal_heart",
    severity: "warning",
    title: "Nhịp tim bất thường: 105 bpm",
    description: "Wearable ghi nhận nhịp tim vượt ngưỡng 100 bpm trong 10 phút",
    details:
      "Vòng tay sức khỏe ghi nhận nhịp tim trung bình 105 bpm liên tục trong 10 phút (ngưỡng an toàn 60-100). SpO2 ổn định ở mức 97%. Có thể do vận động gắng sức, căng thẳng hoặc bất ổn tim mạch cần theo dõi thêm.",
    elderId: "3",
    elderName: "Phạm Thị Hương",
    elderAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop",
    age: 75,
    room: "302",
    confidence: 95.2,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "reviewed",
    deviceId: "WRIST-002",
    deviceName: "Vòng tay sức khỏe",
    signals: [
      { label: "Heart rate", value: "105 bpm", tone: "warn" },
      { label: "SpO2", value: "97%", tone: "good" },
      { label: "Duration", value: "10 phút", tone: "warn" },
      { label: "Threshold", value: ">100 bpm", tone: "warn" },
    ],
    model: "VitalSign-AI",
    modelVersion: "v1.8.0",
    acknowledgedBy: "Bác sĩ Nam",
  },
  {
    id: "EV-2403",
    type: "activity",
    severity: "info",
    title: "Không di chuyển 4 giờ liên tục",
    description: "Activity AI phát hiện người cao tuổi nằm im quá lâu",
    details:
      "Cảm biến giường và camera cho thấy cư dân không rời giường và không có chuyển động đáng kể trong 4 giờ liên tục (từ 09:00 đến 13:00). Đây có thể là dấu hiệu của giấc ngủ sâu hoặc cần kiểm tra sức khỏe.",
    elderId: "4",
    elderName: "Lê Văn Tuấn",
    elderAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop",
    age: 80,
    room: "108",
    confidence: 92.8,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "reviewed",
    deviceId: "BED-002",
    deviceName: "Cảm biến giường",
    signals: [
      { label: "Motion events", value: "0", tone: "warn" },
      { label: "Bed contact", value: "YES", tone: "good" },
      { label: "Sleep depth", value: "Medium", tone: "good" },
    ],
    model: "ActivitySense",
    modelVersion: "v2.1.0",
    acknowledgedBy: "Điều dưỡng Hoa",
  },
  {
    id: "EV-2404",
    type: "face_recognition",
    severity: "info",
    title: "Nhận diện khuôn mặt thành công",
    description: "FaceID xác nhận danh tính người cao tuổi",
    details:
      "Hệ thống Face Recognition xác nhận danh tính cư dân Lê Văn Tuấn khi vào phòng ăn lúc 11:45 với confidence 99.1%. Hệ thống tự động cập nhật trạng thái có mặt và mở cửa phòng.",
    elderId: "4",
    elderName: "Lê Văn Tuấn",
    elderAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop",
    age: 80,
    room: "Phòng ăn",
    confidence: 99.1,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "reviewed",
    deviceId: "CAM-DINING",
    deviceName: "Camera phòng ăn",
    signals: [
      { label: "Match score", value: "99.1%", tone: "good" },
      { label: "Liveness", value: "PASS", tone: "good" },
      { label: "Anti-spoof", value: "PASS", tone: "good" },
    ],
    model: "FaceID-V2",
    modelVersion: "v2.4.0",
    acknowledgedBy: "Hệ thống",
  },
  {
    id: "EV-2405",
    type: "sos",
    severity: "critical",
    title: "Tín hiệu SOS khẩn cấp",
    description: "Nút SOS cầm tay được kích hoạt",
    details:
      "Nút SOS cầm tay của người cao tuổi Đặng Văn Hùng được nhấn lúc 17:42. Tín hiệu được truyền qua mạng BLE tới gateway trong 0.4 giây. Đội ngũ trực đã phản hồi trong 28 giây.",
    elderId: "6",
    elderName: "Đặng Văn Hùng",
    elderAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
    age: 84,
    room: "310",
    confidence: 100,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "reviewed",
    deviceId: "SOS-001",
    deviceName: "Nút SOS cầm tay",
    signals: [
      { label: "Signal", value: "STRONG", tone: "good" },
      { label: "Latency", value: "0.4s", tone: "good" },
      { label: "Response", value: "28s", tone: "warn" },
    ],
    model: "SOS-Relay",
    modelVersion: "v1.2.0",
    acknowledgedBy: "Bác sĩ Nam",
  },
  {
    id: "EV-2406",
    type: "medication",
    severity: "info",
    title: "Nhắc nhở uống thuốc",
    description: "Đến giờ uống thuốc huyết áp buổi chiều",
    details:
      "Hệ thống Medication AI phát hiện lịch uống thuốc huyết áp lúc 14:00 hằng ngày của cư dân Trần Văn Minh. Vòng tay sức khỏe xác nhận cư dân vẫn ổn định và đang ở phòng.",
    elderId: "2",
    elderName: "Trần Văn Minh",
    elderAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
    age: 82,
    room: "105",
    confidence: 100,
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    status: "pending",
    deviceId: "WRIST-002",
    deviceName: "Vòng tay sức khỏe",
    signals: [
      { label: "Schedule", value: "14:00 daily", tone: "good" },
      { label: "Adherence", value: "94%", tone: "good" },
      { label: "Last dose", value: "12h ago", tone: "warn" },
    ],
    model: "MediTrack",
    modelVersion: "v1.0.3",
  },
  {
    id: "EV-2407",
    type: "wander",
    severity: "warning",
    title: "Đi lang thang ngoài khung giờ",
    description: "Phát hiện di chuyển bất thường trong đêm",
    details:
      'Camera hành lang phát hiện cư dân Hoàng Thị Mai rời phòng lúc 02:14, đi vòng quanh không rõ mục đích trong 8 phút. AI phân loại đây là hành vi "wander" với độ tin cậy 88%. Có thể liên quan tới chứng mất ngủ hoặc rối loạn định hướng.',
    elderId: "5",
    elderName: "Hoàng Thị Mai",
    elderAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
    age: 76,
    room: "205",
    confidence: 88,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: "reviewed",
    deviceId: "CAM-005",
    deviceName: "Camera Hành lang T2",
    snapshot:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=720&h=420&fit=crop",
    snapshotCaption: "Heatmap hành trình di chuyển trong đêm",
    signals: [
      { label: "Distance", value: "47m", tone: "warn" },
      { label: "Duration", value: "8 phút", tone: "warn" },
      { label: "Time", value: "02:14 AM", tone: "bad" },
    ],
    model: "BehaviorNet",
    modelVersion: "v2.0.0",
    acknowledgedBy: "Bác sĩ Nam",
  },
  {
    id: "EV-2408",
    type: "vital",
    severity: "warning",
    title: "SpO2 giảm xuống 91%",
    description: "Nồng độ oxy trong máu giảm nhẹ",
    details:
      "Vòng tay sức khỏe ghi nhận SpO2 giảm xuống 91% trong 5 phút (ngưỡng an toàn ≥95%). Nhịp tim ổn định 78 bpm. Có thể do tư thế nằm hoặc cần kiểm tra hô hấp.",
    elderId: "3",
    elderName: "Phạm Thị Hương",
    elderAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop",
    age: 75,
    room: "302",
    confidence: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: "reviewed",
    deviceId: "WRIST-002",
    deviceName: "Vòng tay sức khỏe",
    signals: [
      { label: "SpO2", value: "91%", tone: "bad" },
      { label: "Heart rate", value: "78 bpm", tone: "good" },
      { label: "Threshold", value: "≥95%", tone: "warn" },
    ],
    model: "VitalSign-AI",
    modelVersion: "v1.8.0",
    acknowledgedBy: "Bác sĩ Nam",
  },
  {
    id: "EV-2409",
    type: "voice",
    severity: "critical",
    title: 'Tiếng kêu "cứu" được VoiceAI phát hiện',
    description: "Microphone AI ghi nhận tiếng kêu cứu 87dB trong phòng 201",
    details:
      'Camera AI phòng 201 tích hợp microphone ghi nhận chuỗi âm thanh bất thường lúc 21:15. Mô hình VoiceAI phân tích phổ tần số và nhận diện tiếng kêu "cứu" với probability 94%. Biên độ âm thanh đo được 87dB vượt ngưỡng cảnh báo 85dB. Hệ thống đã tự động: phát loa cảnh báo trong phòng, gọi điện thoại tự động tới 2 người thân, gửi thông báo push tới ứng dụng điều dưỡng trong vòng 8 giây.',
    elderId: "1",
    elderName: "Nguyễn Thị Lan",
    elderAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop",
    age: 78,
    room: "201",
    confidence: 94,
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    status: "pending",
    deviceId: "CAM-AUDIO-001",
    deviceName: "Camera AI + Audio Phòng 201",
    snapshot:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=720&h=420&fit=crop",
    snapshotCaption: "Phổ tần số VoiceAI - khoanh vùng tiếng kêu cứu",
    signals: [
      { label: "Amplitude", value: "87 dB", tone: "bad" },
      { label: "Threshold", value: "85 dB", tone: "warn" },
      { label: "Keyword", value: '"Cứu"', tone: "bad" },
      { label: "Probability", value: "94%", tone: "good" },
    ],
    model: "VoiceAI-v2",
    modelVersion: "v2.1.3",
  },
  {
    id: "EV-2410",
    type: "thermal",
    severity: "critical",
    title: "Nhiệt độ bề mặt 39.2°C - vượt ngưỡng sốt cao",
    description:
      "Camera nhiệt phát hiện nhiệt độ bất thường trên cơ thể người cao tuổi",
    details:
      "Camera nhiệt phòng 302 phát hiện nhiệt độ bề mặt cơ thể người cao tuổi Phạm Thị Hương đạt 39.2°C tại vùng trán, vượt ngưỡng sốt WHO 38°C. Mô hình ThermalAI phân tích hình ảnh nhiệt từ camera hồng ngoại với độ phân giải 320x240 pixel, cho kết quả confidence 91%. Điều dưỡng đã được thông báo tự động và kiểm tra tại giường sau 3 phút.",
    elderId: "3",
    elderName: "Phạm Thị Hương",
    elderAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop",
    age: 75,
    room: "302",
    confidence: 91,
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    status: "pending",
    deviceId: "THERM-302",
    deviceName: "Camera Nhiệt Phòng 302",
    snapshot:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=720&h=420&fit=crop",
    snapshotCaption: "Bản đồ nhiệt - vùng nhiệt độ cao 39.2°C tại vùng trán",
    signals: [
      { label: "Body temp", value: "39.2°C", tone: "bad" },
      { label: "Fever threshold", value: ">38°C", tone: "warn" },
      { label: "Room temp", value: "27°C", tone: "good" },
      { label: "Confidence", value: "91%", tone: "good" },
    ],
    model: "ThermalAI-v3",
    modelVersion: "v3.0.1",
  },
  {
    id: "EV-2411",
    type: "voice",
    severity: "critical",
    title: "Tiếng rên rỉ kéo dài - VoiceAI confidence 89%",
    description:
      "Microphone AI ghi nhận chuỗi âm thanh rên rỉ bất thường trong phòng 108",
    details:
      "Microphone tích hợp trong camera phòng 108 ghi nhận chuỗi âm thanh rên rỉ liên tục trong 3 phút từ 04:15 đến 04:18. Mô hình VoiceAI xác định đây là tiếng kêu gọi giúp đỡ với probability 89% - ngưỡng cảnh báo 80%. Hệ thống đã gọi điện tự động tới gia đình ông Tuấn và thông báo bảo vệ trực đêm kiểm tra.",
    elderId: "4",
    elderName: "Lê Văn Tuấn",
    elderAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop",
    age: 80,
    room: "108",
    confidence: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "reviewed",
    deviceId: "CAM-AUDIO-004",
    deviceName: "Camera AI + Audio Phòng 108",
    signals: [
      { label: "Duration", value: "3 phút", tone: "bad" },
      { label: "Pattern", value: "Kêu gọi", tone: "bad" },
      { label: "Amplitude", value: "79 dB", tone: "warn" },
      { label: "Probability", value: "89%", tone: "good" },
    ],
    model: "VoiceAI-v2",
    modelVersion: "v2.1.3",
    acknowledgedBy: "Điều dưỡng Minh",
  },
  {
    id: "EV-2412",
    type: "thermal",
    severity: "critical",
    title: "Nhiệt độ phòng tăng đột ngột 5°C - cảnh báo cháy",
    description: "Camera nhiệt hành lang ghi nhận điểm nóng bất thường 42°C",
    details:
      "Camera nhiệt hành lang tầng 2 ghi nhận nhiệt độ môi trường tăng từ 26°C lên 31°C trong 30 phút. Vùng gần phòng 205 có điểm nóng phát hiện ở 42°C - cao hơn ngưỡng an toàn 40°C. ThermalAI kích hoạt cảnh báo cháy cấp độ 2. Hệ thống PCCC được thông báo tự động, cư dân tầng 2 được sơ tán trong 12 phút.",
    elderId: "5",
    elderName: "Hoàng Thị Mai",
    elderAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop",
    age: 76,
    room: "205",
    confidence: 96,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "reviewed",
    deviceId: "THERM-HALL-002",
    deviceName: "Camera Nhiệt Hành lang T2",
    snapshot:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=720&h=420&fit=crop",
    snapshotCaption: "Bản đồ nhiệt hành lang - vùng nóng 42°C gần phòng 205",
    signals: [
      { label: "Hotspot", value: "42°C", tone: "bad" },
      { label: "Room delta", value: "+5°C", tone: "bad" },
      { label: "Threshold", value: ">40°C", tone: "warn" },
      { label: "Response time", value: "12 phút", tone: "good" },
    ],
    model: "ThermalAI-v3",
    modelVersion: "v3.0.1",
    acknowledgedBy: "Bảo vệ Lâm",
  },
];

export function AIEventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const toast = useToast();

  const filteredEvents = useMemo(() => {
    return aiEvents.filter((event) => {
      const matchesSearch =
        searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.elderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || event.type === typeFilter;
      const matchesSeverity =
        severityFilter === "all" || event.severity === severityFilter;
      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;
      return matchesSearch && matchesType && matchesSeverity && matchesStatus;
    });
  }, [searchTerm, typeFilter, severityFilter, statusFilter]);

  const selectedEvent =
    filteredEvents.find((e) => e.id === selectedId) ||
    aiEvents.find((e) => e.id === selectedId);

  const stats = useMemo(() => {
    const total = aiEvents.length;
    const critical = aiEvents.filter((e) => e.severity === "critical").length;
    const warning = aiEvents.filter((e) => e.severity === "warning").length;
    const pending = aiEvents.filter((e) => e.status === "pending").length;
    const avgConfidence =
      total === 0 ? 0 : aiEvents.reduce((a, e) => a + e.confidence, 0) / total;
    return { total, critical, warning, pending, avgConfidence };
  }, []);

  const openEvent = (event: AIEvent) => {
    setSelectedId(event.id);
    setOpenDetail(true);
    toast.show({
      title: `Đã mở chi tiết AI event`,
      description: `${event.id} · ${event.title}`,
      variant: event.severity === "critical" ? "destructive" : "info",
      duration: 3000,
    });
  };

  const markReviewed = (event: AIEvent) => {
    event.status = "reviewed";
    event.acknowledgedBy = "Bạn";
    toast.success("Đã đánh dấu đã xem", `${event.id} · ${event.title}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Brain className="h-3.5 w-3.5" />
            AI Engine · Events Stream
          </div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">AI Events</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sự kiện được phát hiện và phân tích bởi các mô hình AI Vision,
            Vital, Activity & Behavior.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5">
            <Brain className="h-3 w-3" />
            AI Active
          </Badge>
          <Badge className="gap-1.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {stats.total} events
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={AlertTriangle}
          tone="red"
          value={stats.critical}
          label="Sự kiện Critical"
          hint={`/${stats.total} tổng`}
        />
        <StatCard
          icon={Activity}
          tone="amber"
          value={stats.warning}
          label="Sự kiện Warning"
          hint={`/${stats.total} tổng`}
        />
        <StatCard
          icon={Sparkles}
          tone="blue"
          value={stats.avgConfidence.toFixed(1) + "%"}
          label="Avg AI Confidence"
          hint="Vision + Vital"
        />
        <StatCard
          icon={Clock}
          tone="emerald"
          value={"2.5s"}
          label="Avg Response"
          hint="Detection → notify"
        />
      </div>

      {/* Search & Filter */}
      <Card className="bg-card/60 backdrop-blur">
        <CardContent className="space-y-3 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Tìm theo mã, tên cư dân, mô tả..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Xóa"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="lg:w-[170px]">
                <SelectValue placeholder="Loại sự kiện" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                {(Object.keys(eventTypeConfig) as AIEventType[]).map((t) => (
                  <SelectItem key={t} value={t}>
                    {eventTypeConfig[t].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="lg:w-[150px]">
                <SelectValue placeholder="Mức độ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="lg:w-[150px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="pending">Chờ xử lý</SelectItem>
                <SelectItem value="reviewed">Đã xem</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Hiển thị{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {filteredEvents.length}
              </span>{" "}
              / {stats.total} sự kiện
            </span>
            {(searchTerm ||
              typeFilter !== "all" ||
              severityFilter !== "all" ||
              statusFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setSeverityFilter("all");
                  setStatusFilter("all");
                  toast.info("Đã đặt lại bộ lọc");
                }}
                className="h-7 gap-1 text-xs"
              >
                <Sliders className="h-3 w-3" />
                Đặt lại bộ lọc
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Events list */}
      <div className="space-y-3">
        {filteredEvents.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
              <Search className="h-5 w-5 opacity-50" />
              Không tìm thấy sự kiện phù hợp
            </CardContent>
          </Card>
        )}
        {filteredEvents.map((event) => {
          const eventType = eventTypeConfig[event.type];
          const severity = severityConfig[event.severity];
          const status = statusConfig[event.status];
          const EventIcon = eventType.icon;
          return (
            <Card
              key={event.id}
              className={cn(
                "group overflow-hidden transition-all hover:shadow-md hover:border-blue-500/40 cursor-pointer",
                event.severity === "critical" && "border-red-500/30",
                event.severity === "warning" && "border-amber-500/30",
              )}
              onClick={() => openEvent(event)}
            >
              <div
                className={cn(
                  "h-1",
                  eventType.bg.split(" ")[0].replace("/10", ""),
                )}
              />
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "rounded-xl p-3 border shrink-0",
                      eventType.bg,
                    )}
                  >
                    <EventIcon className={cn("h-5 w-5", eventType.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                            {event.title}
                          </h3>
                          <Badge
                            className={cn(
                              "text-[10px] uppercase tracking-wider",
                              severity.classes,
                            )}
                          >
                            {severity.label}
                          </Badge>
                          <Badge className={cn("text-[10px]", status.classes)}>
                            {status.label}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {event.description}
                        </p>
                        <div className="mt-2 flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={event.elderAvatar} />
                              <AvatarFallback className="bg-blue-500/10 text-[9px] font-bold text-blue-500">
                                {getInitials(event.elderName)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                              {event.elderName}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-[10px]">
                            <MapPin className="mr-1 h-3 w-3" />
                            {event.room}
                          </Badge>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            <Hash className="h-3 w-3" />
                            {event.id}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <Clock className="h-3 w-3" />
                            {timeAgo(event.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Confidence
                        </p>
                        <p className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">
                          {event.confidence}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <Progress
                        value={event.confidence}
                        className="h-1.5 flex-1 max-w-[260px]"
                      />
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEvent(event);
                          }}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Chi tiết
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                        {event.status === "pending" && (
                          <Button
                            size="sm"
                            className="h-8 gap-1.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              markReviewed(event);
                            }}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Đánh dấu đã xem
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detail drawer */}
      <Sheet open={openDetail} onOpenChange={setOpenDetail}>
        <SheetContent
          side="right"
          className="flex w-full flex-col sm:max-w-lg md:max-w-xl lg:max-w-2xl"
        >
          {selectedEvent ? (
            <EventDetailView
              event={selectedEvent}
              onMarkReviewed={markReviewed}
            />
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
              Chọn một sự kiện để xem chi tiết
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function StatCard({
  icon: Icon,
  tone,
  value,
  label,
  hint,
}: {
  icon: React.ElementType;
  tone: "red" | "amber" | "blue" | "emerald";
  value: string | number;
  label: string;
  hint?: string;
}) {
  const map = {
    red: "border-red-500/30 bg-red-500/5 text-red-500",
    amber: "border-amber-500/30 bg-amber-500/5 text-amber-500",
    blue: "border-blue-500/30 bg-blue-500/5 text-blue-500",
    emerald: "border-emerald-500/30 bg-emerald-500/5 text-emerald-500",
  };
  return (
    <Card
      className={cn(
        "bg-card/60 backdrop-blur transition-all hover:shadow-md",
        map[tone],
      )}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div
          className={cn("rounded-xl p-2.5 border bg-background/40", map[tone])}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>
          {hint && <p className="text-[10px] text-slate-400">{hint}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

function EventDetailView({
  event,
  onMarkReviewed,
}: {
  event: AIEvent;
  onMarkReviewed: (e: AIEvent) => void;
}) {
  const eventType = eventTypeConfig[event.type];
  const severity = severityConfig[event.severity];
  const status = statusConfig[event.status];
  const EventIcon = eventType.icon;
  const toneClass = {
    good: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    warn: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    bad: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    <>
      <SheetHeader className="border-b border-slate-200/10 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            className={cn(
              "text-[10px] uppercase tracking-wider",
              severity.classes,
            )}
          >
            {severity.label}
          </Badge>
          <Badge className={cn("text-[10px]", status.classes)}>
            {status.label}
          </Badge>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
            <Hash className="h-3 w-3" />
            {event.id}
          </span>
        </div>
        <SheetTitle className="mt-2 text-xl">{event.title}</SheetTitle>
        <SheetDescription>{event.description}</SheetDescription>
        <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDateTime(event.timestamp)} · {timeAgo(event.timestamp)}
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            AI confidence {event.confidence}%
          </span>
        </div>
      </SheetHeader>

      <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
        {/* Snapshot */}
        {event.snapshot && (
          <section>
            <SectionTitle icon={Camera}>Ảnh chụp từ camera</SectionTitle>
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-200/10 bg-slate-900/60 dark:border-slate-800">
              <div className="relative aspect-video w-full bg-slate-950">
                <img
                  src={event.snapshot}
                  alt={event.snapshotCaption || event.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-3 rounded-lg border-2 border-blue-500/60" />
                <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-blue-500/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/30">
                  <Sparkles className="h-3 w-3" />
                  AI {event.model || "Model"}
                </span>
                <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[10px] font-mono text-white">
                  {event.deviceName}
                </span>
                <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-blue-500/90 px-2 py-1 text-[10px] font-bold text-white">
                  {event.confidence}%
                </span>
              </div>
              <div className="flex items-center gap-2 border-t border-slate-200/10 bg-slate-50/80 px-3 py-2 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
                <Camera className="h-3.5 w-3.5" />
                <span className="truncate">
                  {event.snapshotCaption || "Ảnh chụp tại thời điểm phát hiện"}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Description */}
        <section>
          <SectionTitle icon={Brain}>Phân tích chi tiết</SectionTitle>
          <p className="mt-2 rounded-lg border border-slate-200/10 bg-slate-50/60 p-3 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
            {event.details}
          </p>
        </section>

        {/* AI Signals */}
        {event.signals && event.signals.length > 0 && (
          <section>
            <SectionTitle icon={Activity}>Tín hiệu AI</SectionTitle>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {event.signals.map((s) => (
                <div
                  key={s.label}
                  className={cn("rounded-lg border p-2.5", toneClass[s.tone])}
                >
                  <p className="text-[10px] uppercase tracking-wider opacity-80">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Elder info */}
        <section>
          <SectionTitle icon={Cpu}>Thông tin liên quan</SectionTitle>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-3 rounded-lg border border-slate-200/10 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-900/60">
              <Avatar className="h-10 w-10">
                <AvatarImage src={event.elderAvatar} alt={event.elderName} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-xs font-semibold text-blue-500">
                  {getInitials(event.elderName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {event.elderName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Phòng {event.room}
                  {event.age ? ` · ${event.age} tuổi` : ""}
                </p>
              </div>
              <div className={cn("rounded-lg p-2 border", eventType.bg)}>
                <EventIcon className={cn("h-4 w-4", eventType.color)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <InfoRow label="Device ID" value={event.deviceId} mono />
              <InfoRow label="Device" value={event.deviceName} />
              <InfoRow label="AI Model" value={event.model || "—"} />
              <InfoRow label="Version" value={event.modelVersion || "—"} mono />
            </div>
          </div>
        </section>

        {/* Status */}
        <section>
          <SectionTitle icon={CheckCircle2}>Trạng thái xử lý</SectionTitle>
          <div className="mt-2 rounded-lg border border-slate-200/10 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-900/60">
            {event.status === "pending" ? (
              <p className="text-xs text-amber-500">
                Sự kiện đang chờ nhân viên y tế xem xét và xử lý.
              </p>
            ) : (
              <p className="text-xs text-emerald-500">
                Đã xem bởi{" "}
                <span className="font-semibold">
                  {event.acknowledgedBy || "—"}
                </span>
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="sticky bottom-0 z-10 flex items-center justify-between gap-2 border-t border-slate-200/10 bg-white/95 px-6 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {formatDateTime(event.timestamp)}
        </span>
        {event.status === "pending" ? (
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => onMarkReviewed(event)}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Đánh dấu đã xem
          </Button>
        ) : (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Đã xử lý
          </Badge>
        )}
      </div>
    </>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-200/10 bg-slate-50/60 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/60">
      <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p
        className={cn(
          "mt-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200",
          mono && "font-mono",
        )}
      >
        {value}
      </p>
    </div>
  );
}
