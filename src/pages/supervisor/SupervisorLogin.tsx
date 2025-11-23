import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SUPERVISOR_ACCESS_CODE = "TAJROYALS2025SUPERVISOR";

export default function SupervisorLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [accessCode, setAccessCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Check if user has admin/super_admin role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .in('role', ['admin', 'super_admin']);
      
      if (roles && roles.length > 0) {
        navigate("/supervisor");
      }
    }
  };

  const handleAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === SUPERVISOR_ACCESS_CODE) {
      setShowAuthForm(true);
      toast({
        title: "Code Verified",
        description: "Please login with your admin credentials",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Access denied. Please check the code and try again.",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        // Check if user has admin/super_admin role
        const { data: roles } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.session.user.id)
          .in('role', ['admin', 'super_admin']);
        
        if (roles && roles.length > 0) {
          toast({
            title: "Access Granted",
            description: "Welcome to Supervisor Panel",
          });
          navigate("/supervisor");
        } else {
          await supabase.auth.signOut();
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have supervisor privileges",
          });
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Supervisor Access</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter the supervisor access code to continue
          </p>
        </CardHeader>
        <CardContent>
          {!showAuthForm ? (
            <form onSubmit={handleAccessCode} className="space-y-4">
              <div>
                <Label htmlFor="access-code">Access Code</Label>
                <Input
                  id="access-code"
                  type="password"
                  placeholder="Enter supervisor access code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <Button type="submit" className="w-full">
                Verify Code
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setShowAuthForm(false)}
              >
                ← Back to Access Code
              </Button>
            </form>
          )}
          <div className="mt-6 pt-6 border-t text-center">
            <Button
              variant="link"
              size="sm"
              onClick={() => navigate("/")}
              className="text-xs"
            >
              ← Back to Main Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
