import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Shield } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signIn, user, isAdmin, isSuperAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user && (isAdmin || isSuperAdmin)) {
      navigate('/admin');
    } else if (user && !isAdmin && !isSuperAdmin) {
      navigate('/dashboard');
    }
  }, [user, isAdmin, isSuperAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(loginData.email, loginData.password);
    setIsLoading(false);
    // Navigation handled by useEffect based on role
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <p className="text-sm text-muted-foreground">
            The Taj Royals - Core Team Portal
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@tajroyals.com"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In to Admin Panel"}
            </Button>
          </form>
          <div className="mt-6 pt-6 border-t text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an admin account?
            </p>
            <Button
              variant="link"
              onClick={() => navigate('/admin/signup')}
            >
              Create Admin Account
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => navigate('/')}
              className="block mx-auto text-xs"
            >
              ← Back to Main Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
