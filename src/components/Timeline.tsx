import { Briefcase, GraduationCap, Award } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Timeline = () => {
  const timelineEvents = [
    {
      type: "work",
      icon: Briefcase,
      title: "DevOps Engineer",
      organization: "Tech Solutions Inc.",
      period: "2023 - Present",
      description: "Leading infrastructure automation and CI/CD pipeline implementations. Managing Docker containerization, Kubernetes orchestration, and cloud infrastructure on AWS and GCP.",
      highlights: [
        "Reduced deployment time by 60% through automated CI/CD pipelines",
        "Implemented monitoring solutions using Prometheus and Grafana",
        "Managed production infrastructure serving 100K+ users"
      ]
    },
    {
      type: "work",
      icon: Briefcase,
      title: "Junior DevOps Engineer",
      organization: "Cloud Innovations",
      period: "2022 - 2023",
      description: "Focused on containerization strategies and deployment automation. Built and maintained Docker-based development environments and CI/CD workflows.",
      highlights: [
        "Dockerized 15+ legacy applications",
        "Implemented GitHub Actions workflows for automated testing",
        "Collaborated with development teams on infrastructure optimization"
      ]
    },
    {
      type: "education",
      icon: GraduationCap,
      title: "Bachelor's in Computer Science",
      organization: "University Name",
      period: "2018 - 2022",
      description: "Specialized in cloud computing and distributed systems. Completed projects in infrastructure automation and containerization.",
      highlights: [
        "Focus on Cloud Computing and DevOps practices",
        "Final year project on Kubernetes cluster management",
        "Relevant coursework: System Administration, Network Security"
      ]
    },
    {
      type: "certification",
      icon: Award,
      title: "AWS Certified Solutions Architect",
      organization: "Amazon Web Services",
      period: "2023",
      description: "Validated expertise in designing and deploying scalable systems on AWS.",
      highlights: []
    },
    {
      type: "certification",
      icon: Award,
      title: "Docker Certified Associate",
      organization: "Docker Inc.",
      period: "2022",
      description: "Demonstrated proficiency in Docker containerization and orchestration.",
      highlights: []
    }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case "work":
        return "text-primary";
      case "education":
        return "text-[hsl(var(--gradient-mid))]";
      case "certification":
        return "text-[hsl(var(--gradient-end))]";
      default:
        return "text-primary";
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="timeline">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] bg-clip-text text-transparent">
            Career Journey
          </h2>
          <p className="text-muted-foreground text-lg">
            My path in DevOps and cloud infrastructure
          </p>
        </div>
      </ScrollReveal>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] opacity-30" />

        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="relative pl-20">
                {/* Icon */}
                <div className={`absolute left-0 w-16 h-16 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center ${getIconColor(event.type)} shadow-lg`}>
                  <event.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                      <p className="text-primary font-medium">{event.organization}</p>
                    </div>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {event.period}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-3">{event.description}</p>

                  {event.highlights.length > 0 && (
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
