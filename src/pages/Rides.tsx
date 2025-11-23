import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Route, TrendingUp } from "lucide-react";

const Rides = () => {
  const rides = [
    {
      id: 1,
      title: "Sunday Morning Cruise",
      date: "2025-12-01",
      type: "Sunday Ride",
      difficulty: "Easy",
      start: "Taj Mahal, Agra",
      end: "Fatehpur Sikri",
      distance: "40 km",
      spots: 20,
      status: "Open",
    },
    {
      id: 2,
      title: "Jaipur Heritage Ride",
      date: "2025-12-08",
      type: "Long Ride",
      difficulty: "Basic",
      start: "Agra",
      end: "Jaipur",
      distance: "240 km",
      spots: 15,
      status: "Open",
    },
    {
      id: 3,
      title: "Charity Ride - Education Fund",
      date: "2025-12-15",
      type: "Charity",
      difficulty: "Easy",
      start: "City Center",
      end: "Rural Schools Circuit",
      distance: "60 km",
      spots: 30,
      status: "Open",
    },
    {
      id: 4,
      title: "Moonlight City Tour",
      date: "2025-12-20",
      type: "Night Ride",
      difficulty: "Easy",
      start: "Club House",
      end: "Agra Fort",
      distance: "25 km",
      spots: 25,
      status: "Open",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500";
      case "Basic":
        return "bg-blue-500";
      case "Advance":
        return "bg-orange-500";
      case "Extreme":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center animate-fade-in">Ride Calendar</h1>
          <p className="text-center text-muted-foreground mb-12 animate-fade-in">
            Join us on our upcoming adventures
          </p>

          <div className="space-y-6">
            {rides.map((ride, index) => (
              <Card
                key={ride.id}
                className="hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{ride.title}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{ride.type}</Badge>
                        <Badge className={getDifficultyColor(ride.difficulty)}>
                          {ride.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Button size="lg">Register Now</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Date</div>
                        <div className="font-medium">
                          {new Date(ride.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Start</div>
                        <div className="font-medium">{ride.start}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">End</div>
                        <div className="font-medium">{ride.end}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Route className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Distance</div>
                        <div className="font-medium">{ride.distance}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Spots Left</div>
                        <div className="font-medium">{ride.spots}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rides;
