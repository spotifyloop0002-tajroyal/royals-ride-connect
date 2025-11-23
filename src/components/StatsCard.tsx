import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
}

const StatsCard = ({ icon: Icon, title, value }: StatsCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6 text-center">
        <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
        <div className="text-3xl font-bold text-primary mb-2">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
