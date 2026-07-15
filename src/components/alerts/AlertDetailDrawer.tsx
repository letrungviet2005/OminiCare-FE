import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle2,
  Clock,
  Cpu,
  ExternalLink,
  MapPin,
  Phone,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  Video,
  Activity,
  Calendar,
  Hash,
  AlertCircle,
  Loader2,
  CircleDot,
  Image as ImageIcon,
  Maximize2,
  Camera,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { alertService } from "@/services";
import { alertStatusConfig, riskLevelConfig } from "./alertMeta";
import { cn, formatDateTime, getInitials, timeAgo } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import type { Alert } from "@/types";
import image from "../../assets/image.png";

interface AlertDetailDrawerProps {
  alertId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChanged?: () => void;
}

export function AlertDetailDrawer({
  alertId,
  open,
  onOpenChange,
  onChanged,
}: AlertDetailDrawerProps) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: alert, isLoading } = useQuery({
    queryKey: ["alert", alertId],
    queryFn: () => alertService.getById(alertId as string),
    enabled: !!alertId,
  });

  const acknowledgeMutation = useMutation({
    mutationFn: (id: string) => alertService.acknowledge(id),
    onSuccess: (updated, id) => {
      queryClient.invalidateQueries({ queryKey: ["alert", alertId] });
      queryClient.invalidateQueries({ queryKey: ["alerts-list"] });
      queryClient.invalidateQueries({ queryKey: ["alert-stats"] });
      toast.success(
        "Đã xác nhận tiếp nhận",
        updated ? `${updated.id} · ${updated.title}` : `Mã ${id}`,
      );
      onChanged?.();
    },
    onError: () => toast.error("Không thể xác nhận", "Vui lòng thử lại sau."),
  });

  const resolveMutation = useMutation({
    mutationFn: (id: string) => alertService.resolve(id),
    onSuccess: (updated, id) => {
      queryClient.invalidateQueries({ queryKey: ["alert", alertId] });
      queryClient.invalidateQueries({ queryKey: ["alerts-list"] });
      queryClient.invalidateQueries({ queryKey: ["alert-stats"] });
      toast.success(
        "Đã đóng cảnh báo",
        updated ? `${updated.id} · ${updated.title}` : `Mã ${id}`,
      );
      onChanged?.();
    },
    onError: () =>
      toast.error("Không thể đóng cảnh báo", "Vui lòng thử lại sau."),
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        {isLoading || !alert ? (
          <DrawerSkeleton />
        ) : (
          <>
            <SheetHeader className="border-b-0 pb-0">
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-wider",
                    riskLevelConfig[alert.riskLevel].soft,
                    alert.riskLevel === "HIGH" && "shadow-sm shadow-red-500/20",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      riskLevelConfig[alert.riskLevel].dot,
                      alert.riskLevel === "HIGH" && "animate-pulse",
                    )}
                  />
                  RISK: {riskLevelConfig[alert.riskLevel].label}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                    alertStatusConfig[alert.status].classes,
                  )}
                >
                  <CircleDot className="h-3 w-3" />
                  {alertStatusConfig[alert.status].label}
                </span>
              </div>
              <SheetTitle className="mt-3 text-xl leading-tight">
                {alert.title}
              </SheetTitle>
              <SheetDescription className="text-sm">
                {alert.message}
              </SheetDescription>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 font-mono">
                  <Hash className="h-3 w-3" />
                  {alert.id}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDateTime(alert.createdAt)} · {timeAgo(alert.createdAt)}
                </span>
                {alert.confidence !== undefined && (
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    AI confidence {alert.confidence}%
                  </span>
                )}
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Description */}
              {alert.description && (
                <section>
                  <SectionTitle icon={AlertCircle}>Mô tả chi tiết</SectionTitle>
                  <p className="mt-2 rounded-lg border border-slate-200/10 bg-slate-50/60 p-3 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                    {alert.description}
                  </p>
                </section>
              )}

              {/* Snapshot */}
              {alert.snapshot && (
                <section>
                  <SectionTitle icon={Camera}>
                    Ảnh chụp từ camera AI
                  </SectionTitle>
                  <div className="mt-2 overflow-hidden rounded-xl border border-slate-200/10 bg-slate-900/60 dark:border-slate-800">
                    <div className="relative aspect-video w-full bg-slate-950">
                      <img
                        src={image}
                        alt={alert.snapshotCaption || "Ảnh chụp từ camera AI"}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      {/* AI overlay corner brackets to simulate detection frame */}
                      <div className="pointer-events-none absolute inset-3 border-2 border-red-500/60 rounded-lg" />
                      <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-red-500/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        AI Detection
                      </span>
                      <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[10px] font-mono text-white">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                        REC · {formatDateTime(alert.createdAt)}
                      </span>
                      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-black/70 px-2 py-1 text-[10px] font-medium text-white">
                        {alert.deviceName}
                      </span>
                      {typeof alert.confidence === "number" && (
                        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-blue-500/90 px-2 py-1 text-[10px] font-bold text-white">
                          Confidence {alert.confidence}%
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-slate-200/10 bg-slate-50/80 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/80">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <ImageIcon className="h-3.5 w-3.5" />
                        <span className="truncate">
                          {alert.snapshotCaption ||
                            "Ảnh chụp tự động từ camera"}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 px-2 text-xs"
                        onClick={() => window.open(alert.snapshot, "_blank")}
                      >
                        <Maximize2 className="h-3 w-3" />
                        Xem đầy đủ
                      </Button>
                    </div>
                  </div>
                </section>
              )}

              {/* Elder */}
              <section>
                <SectionTitle icon={UserRound}>Người cao tuổi</SectionTitle>
                <div className="mt-2 flex items-start gap-3 rounded-lg border border-slate-200/10 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-900/60">
                  <Avatar className="h-12 w-12 ring-2 ring-blue-500/20">
                    <AvatarImage
                      src={alert.elderAvatar}
                      alt={alert.elderName}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
                      {getInitials(alert.elderName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {alert.elderName}
                    </p>
                    <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                      {alert.elderAge && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {alert.elderAge} tuổi
                        </span>
                      )}
                      {alert.elderRoom && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> Phòng {alert.elderRoom}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Hồ sơ
                  </Button>
                </div>
              </section>

              {/* Family */}
              <section>
                <SectionTitle icon={UserRound}>Gia đình</SectionTitle>
                <div className="mt-2 flex items-start justify-between gap-3 rounded-lg border border-slate-200/10 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {alert.familyName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {alert.familyContact || "—"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 shrink-0"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Gọi
                  </Button>
                </div>
              </section>

              {/* Device */}
              <section>
                <SectionTitle icon={Cpu}>Thiết bị phát hiện</SectionTitle>
                <div className="mt-2 flex items-start justify-between gap-3 rounded-lg border border-slate-200/10 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {alert.deviceName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                      {alert.deviceType}
                      {alert.deviceLocation ? ` · ${alert.deviceLocation}` : ""}
                    </p>
                    <p className="mt-1 text-[11px] font-mono text-slate-400">
                      ID: {alert.deviceId}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 shrink-0"
                  >
                    <Video className="h-3.5 w-3.5" />
                    Xem live
                  </Button>
                </div>
              </section>

              {/* Type info */}
              <section>
                <SectionTitle icon={Activity}>Phân loại</SectionTitle>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(["HIGH", "MEDIUM", "LOW"] as const).map((r) => {
                    const conf = riskLevelConfig[r];
                    const active = alert.riskLevel === r;
                    return (
                      <div
                        key={r}
                        className={cn(
                          "rounded-lg border p-3 text-center",
                          active
                            ? conf.classes
                            : "border-slate-200/10 bg-slate-50/40 dark:border-slate-800 dark:bg-slate-900/40 opacity-50",
                        )}
                      >
                        <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Risk
                        </p>
                        <p className="mt-1 text-base font-bold">{conf.label}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Timeline */}
              <section>
                <SectionTitle icon={Clock}>Lịch sử xử lý</SectionTitle>
                <div className="mt-3 space-y-3">
                  <TimelineItem
                    icon={ShieldAlert}
                    title="Hệ thống AI phát hiện cảnh báo"
                    time={alert.createdAt}
                    actor="AI Engine"
                    tone="slate"
                  />
                  {alert.acknowledgedAt && (
                    <TimelineItem
                      icon={CheckCircle2}
                      title="Xác nhận tiếp nhận"
                      time={alert.acknowledgedAt}
                      actor={alert.acknowledgedBy || "—"}
                      tone="indigo"
                    />
                  )}
                  {alert.resolvedAt && (
                    <TimelineItem
                      icon={ShieldCheck}
                      title="Đã đóng cảnh báo"
                      time={alert.resolvedAt}
                      actor={alert.resolvedBy || "—"}
                      tone="emerald"
                    />
                  )}
                  {(alert.actions || []).map((a) => (
                    <TimelineItem
                      key={a.id}
                      icon={Activity}
                      title={a.label}
                      time={a.timestamp}
                      actor={a.actor}
                      tone="blue"
                    />
                  ))}
                </div>
              </section>
            </div>

            <div className="sticky bottom-0 z-10 flex items-center justify-between gap-2 border-t border-slate-200/10 bg-white/95 px-6 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {alert.status === "resolved" ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-500">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Đã xử lý
                  </span>
                ) : alert.status === "new" ? (
                  <span className="inline-flex items-center gap-1.5 text-blue-500">
                    <CircleDot className="h-3.5 w-3.5" />
                    Cảnh báo mới - cần xử lý
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-violet-500">
                    <Loader2 className="h-3.5 w-3.5" />
                    Đang xử lý
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {alert.status === "new" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => acknowledgeMutation.mutate(alert.id)}
                    disabled={acknowledgeMutation.isPending}
                    className="gap-1.5"
                  >
                    {acknowledgeMutation.isPending ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    )}
                    Xác nhận
                  </Button>
                )}
                {alert.status !== "resolved" && (
                  <Button
                    size="sm"
                    onClick={() => resolveMutation.mutate(alert.id)}
                    disabled={resolveMutation.isPending}
                    className="gap-1.5"
                  >
                    {resolveMutation.isPending ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ShieldCheck className="h-3.5 w-3.5" />
                    )}
                    Đóng cảnh báo
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
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

function TimelineItem({
  icon: Icon,
  title,
  time,
  actor,
  tone,
}: {
  icon: React.ElementType;
  title: string;
  time: string;
  actor: string;
  tone: "slate" | "blue" | "indigo" | "emerald";
}) {
  const toneClass = {
    slate: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  }[tone];

  return (
    <div className="relative flex gap-3 pl-1">
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
          toneClass,
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1 pb-1">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {title}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {formatDateTime(time)} · bởi{" "}
          <span className="font-medium">{actor}</span>
        </p>
      </div>
    </div>
  );
}

function DrawerSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="space-y-3 px-6 py-5 border-b border-slate-200/10 dark:border-slate-800">
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="flex-1 space-y-4 px-6 py-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-16 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-900" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Re-export for convenience if other modules import the Alert type
export type { Alert };
