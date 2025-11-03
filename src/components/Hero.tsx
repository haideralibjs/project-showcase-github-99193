import { Search, FileCode, Terminal, BookOpen, GitBranch } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import TypingAnimation from "./TypingAnimation";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Hero = ({ searchQuery, setSearchQuery }: HeroProps) => {
  const navigate = useNavigate();
  
  const navigationSections = [
    {
      title: "Docker Files",
      description: "Production-ready Dockerfiles",
      icon: FileCode,
      route: "/dockerfiles",
      available: true,
    },
    {
      title: "Ansible Playbooks",
      description: "Automation playbooks",
      icon: Terminal,
      route: "/ansible-playbooks",
      available: false,
    },
    {
      title: "Bash Scripts",
      description: "Shell automation scripts",
      icon: BookOpen,
      route: "/bash-scripts",
      available: false,
    },
    {
      title: "CI/CD Pipelines",
      description: "GitHub Actions workflows",
      icon: GitBranch,
      route: "/pipelines",
      available: true,
    },
  ];
  
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Tech-themed decorative elements */}
      <div className="absolute top-10 left-10 text-5xl opacity-10 animate-pulse" style={{ animationDuration: '3s' }}>
        &lt;/&gt;
      </div>
      <div className="absolute top-32 right-16 text-4xl opacity-10 animate-pulse" style={{ animationDuration: '4s' }}>
        ⚙️
      </div>
      <div className="absolute bottom-20 left-20 text-4xl opacity-10 animate-pulse" style={{ animationDuration: '3.5s' }}>
        🔧
      </div>
      <div className="absolute bottom-32 right-32 text-5xl opacity-10 animate-pulse" style={{ animationDuration: '4.5s' }}>
        {'{ }'}
      </div>
      
      {/* Gradient orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[hsl(var(--gradient-start)_/_0.1)] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[hsl(var(--gradient-end)_/_0.1)] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] bg-clip-text text-transparent drop-shadow-sm">
          <TypingAnimation text="DevOps Portfolio" speed={80} />
        </h1>
        <p className="mt-4 text-lg text-muted-foreground font-medium">
          Junior DevOps Engineer | Docker & CI/CD Pipelines | PHP App Deployment | Monitoring & Automation
        </p>
        
        <div className="mt-8 relative max-w-4xl mx-auto space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {navigationSections.map((section) => (
              <Button
                key={section.route}
                onClick={() => section.available && navigate(section.route)}
                variant="outline"
                disabled={!section.available}
                className="h-auto flex flex-col items-center gap-3 p-6 hover-scale transition-all hover:shadow-lg hover:border-primary/50 disabled:opacity-50"
              >
                <section.icon className="h-8 w-8 text-primary" />
                <div className="text-center space-y-1">
                  <div className="font-semibold">{section.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {section.description}
                  </div>
                </div>
                {!section.available && (
                  <span className="text-xs px-2 py-1 rounded-full bg-muted">
                    Coming Soon
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        <p className="mt-8 text-lg leading-8 text-muted-foreground flex flex-wrap justify-center gap-2">
          {[
            "Docker",
            "CI/CD Pipelines",
            "PHP Deployment",
            "Prometheus",
            "Grafana",
            "Automation",
            "GitHub Actions",
            "Jenkins",
            "GitLab CI",
            "AWS",
            "Google Cloud",
            "Linux",
            "Bash"
          ].map((skill) => (
            <span key={skill} className="bg-gradient-to-r from-[hsl(var(--gradient-start)_/_0.15)] to-[hsl(var(--gradient-end)_/_0.15)] px-3 py-1.5 rounded-full text-sm font-medium text-foreground border border-primary/20 hover:scale-105 transition-transform">
              {skill}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
};

export default Hero;
