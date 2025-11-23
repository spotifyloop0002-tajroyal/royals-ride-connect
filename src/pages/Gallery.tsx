import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Calendar, Users, Trophy } from "lucide-react";

const Gallery = () => {
  const albums = [
    {
      id: 1,
      title: "Sunday Rides",
      category: "Rides",
      icon: Camera,
      count: 24,
      cover: "🏍️",
    },
    {
      id: 2,
      title: "Himalayan Expedition 2024",
      category: "Long Rides",
      icon: Trophy,
      count: 30,
      cover: "🏔️",
    },
    {
      id: 3,
      title: "Club Meetups",
      category: "Events",
      icon: Users,
      count: 18,
      cover: "🤝",
    },
    {
      id: 4,
      title: "Bike Expo Participation",
      category: "Events",
      icon: Calendar,
      count: 15,
      cover: "🏁",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-center animate-fade-in">Gallery</h1>
          <p className="text-center text-muted-foreground mb-12 animate-fade-in">
            Relive the memories from our incredible journeys
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album, index) => (
              <Card
                key={album.id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="text-6xl mb-4 text-center">{album.cover}</div>
                  <CardTitle className="text-center">{album.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <album.icon size={16} />
                      {album.category}
                    </span>
                    <span>{album.count} photos</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-12 bg-muted/50">
            <CardContent className="p-8 text-center">
              <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">More Albums Coming Soon</h3>
              <p className="text-muted-foreground">
                We're constantly updating our gallery with photos from recent rides and events.
                Check back regularly for new albums!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
