import { Code, Cloud, GitBranch, Server, Terminal, Container } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Skills = () => {
  const skillCategories = [
    {
      icon: Cloud,
      title: "Cloud Platforms",
      skills: ["AWS", "Google Cloud"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Container,
      title: "Containerization",
      skills: ["Docker", "Kubernetes", "Container Registry"],
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: GitBranch,
      title: "CI/CD & GitOps",
      skills: ["GitHub Actions", "Jenkins", "GitLab CI"],
      color: "from-teal-500 to-green-500",
    },
    {
      icon: Server,
      title: "Infrastructure",
      skills: ["Ansible", "Prometheus", "Grafana"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Terminal,
      title: "Scripting & Automation",
      skills: ["Bash", "Python", "PowerShell", "Linux"],
      color: "from-emerald-500 to-lime-500",
    },
    {
      icon: Code,
      title: "Development",
      skills: ["Node.js", "React", "MongoDB", "PostgreSQL"],
      color: "from-lime-500 to-yellow-500",
    },
  ];

  return (
    <section className="py-20 px-4 relative" id="skills">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] bg-clip-text text-transparent">
              Technical Expertise
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive toolkit spanning cloud infrastructure, automation, and full-stack development
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 100}>
              <div className="group relative p-6 rounded-xl border border-border bg-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon with gradient */}
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.color} mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-foreground border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
