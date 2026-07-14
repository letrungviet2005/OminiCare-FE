import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Bell,
  Video,
  Shield,
  Database,
  Save,
} from 'lucide-react'

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Cài đặt</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý cấu hình hệ thống và tài khoản
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Tổng quan</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="camera">Camera</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin tài khoản
              </CardTitle>
              <CardDescription>
                Cập nhật thông tin cá nhân của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input id="name" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@omnicare.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" type="tel" defaultValue="+84 123 456 789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Input id="role" defaultValue="Quản trị viên" disabled />
                </div>
              </div>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Lưu thay đổi
              </Button>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Cấu hình hệ thống
              </CardTitle>
              <CardDescription>
                Các thiết lập chung của hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chế độ bảo trì</Label>
                  <p className="text-sm text-muted-foreground">
                    Tạm thời tắt hệ thống để bảo trì
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tự động sao lưu</Label>
                  <p className="text-sm text-muted-foreground">
                    Sao lưu dữ liệu tự động mỗi ngày
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Chế độ tiết kiệm năng lượng</Label>
                  <p className="text-sm text-muted-foreground">
                    Giảm tải xử lý khi không có hoạt động
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Cài đặt thông báo
              </CardTitle>
              <CardDescription>
                Quản lý các loại thông báo bạn nhận được
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo té ngã</Label>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo ngay khi phát hiện té ngã
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo nhịp tim bất thường</Label>
                  <p className="text-sm text-muted-foreground">
                    Cảnh báo khi nhịp tim vượt ngưỡng
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo SOS</Label>
                  <p className="text-sm text-muted-foreground">
                    Ưu tiên cao cho tín hiệu SOS khẩn cấp
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Thông báo hệ thống</Label>
                  <p className="text-sm text-muted-foreground">
                    Camera offline, lỗi kết nối
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="camera" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Cài đặt Camera
              </CardTitle>
              <CardDescription>
                Cấu hình độ nhạy và các thông số AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Độ nhạy phát hiện té ngã</Label>
                  <Input type="range" min="0" max="100" defaultValue="80" />
                  <p className="text-xs text-muted-foreground">Cao hơn = phát hiện nhiều hơn</p>
                </div>
                <div className="space-y-2">
                  <Label>Ngưỡng nhịp tim bất thường</Label>
                  <Input type="number" defaultValue={100} />
                  <p className="text-xs text-muted-foreground">bpm (nhịp/phút)</p>
                </div>
                <div className="space-y-2">
                  <Label>Thời gian không hoạt động</Label>
                  <Input type="number" defaultValue={4} />
                  <p className="text-xs text-muted-foreground">Giờ không di chuyển để cảnh báo</p>
                </div>
                <div className="space-y-2">
                  <Label>Chất lượng video</Label>
                  <Input defaultValue="1080p" disabled />
                </div>
              </div>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Lưu cài đặt
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Bảo mật
              </CardTitle>
              <CardDescription>
                Quản lý mật khẩu và xác thực
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mật khẩu hiện tại</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Mật khẩu mới</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Xác nhận mật khẩu mới</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button>
                <Shield className="h-4 w-4 mr-2" />
                Đổi mật khẩu
              </Button>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Xác thực 2 yếu tố (2FA)</Label>
                  <p className="text-sm text-muted-foreground">
                    Thêm lớp bảo mật cho tài khoản
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Đăng nhập từ thiết bị mới</Label>
                  <p className="text-sm text-muted-foreground">
                    Thông báo khi có đăng nhập lạ
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
