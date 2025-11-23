import Layout from "@/components/Layout";
import HeroSlider from "@/components/HeroSlider";
import StatsCard from "@/components/StatsCard";
import { MapPin, Users, Route, TrendingUp, Calendar, Award } from "lucide-react";

const Home = () => {
  const stats = [
    { icon: Calendar, title: "Total Rides", value: "500+" },
    { icon: Route, title: "KM Per Rider", value: "125,000" },
    { icon: TrendingUp, title: "Combined KM", value: "180,000" },
    { icon: MapPin, title: "Cities Covered", value: "300+" },
    { icon: Users, title: "Active Riders", value: "350+" },
    { icon: Award, title: "Years Strong", value: "19+" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <HeroSlider />

        <section className="mt-16 animate-fade-in">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Welcome to The Taj Royals</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded on 28 July 2005, The Taj Royals is Agra's oldest and most iconic riders' club. 
              What began as a small group of passionate motorcyclists has evolved into a brotherhood 
              of over 350 riders who share an unwavering love for the open road. For nearly two decades, 
              we've ridden through mountains, deserts, and cities, covering over 180,000 combined kilometers 
              and exploring more than 300 destinations across India. Whether it's a Sunday morning cruise, 
              a challenging high-altitude expedition, or a charity ride to give back to the community, 
              The Taj Royals stands for adventure, camaraderie, and freedom on two wheels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div
                key={stat.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <StatsCard {...stat} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
