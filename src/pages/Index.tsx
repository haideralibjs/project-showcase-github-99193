
import { useState } from "react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollReveal from "@/components/ScrollReveal";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const projects = [
    {
      title: "Azure DevOps CI/CD Pipeline for ASP.NET Applications",
      description: "End-to-end CI/CD pipeline implementation on Azure DevOps featuring automated Docker containerization, Azure Container Registry integration, and continuous deployment workflows for ASP.NET Core applications.",
      link: "/project-showcase-github/Asp_Net_App_Pipeline_on_AzureDevops.pdf",
    },
    {
      title: "ASP.NET Cloud Deployment Platform",
      description: "Production-ready ASP.NET application deployed on Google Cloud Platform with SQL Server database integration and secure firewall management.",
      link: "/project-showcase-github/DotNet_App_Deployment_and_Database_Setup.pdf",
    },
    {
      title: "PHP Application Deployment with Docker",
      description: "Containerized PHP application with Docker, PHP-FPM, Nginx, Supervisor for process management, and automated cron jobs for task scheduling.",
      link: "/project-showcase-github/Php_App_Fine_tuning_and_Deployment_Docker_Php-Fpm_Nginx_Supervisor_Cronjobs.pdf",
    },
    {
      title: "Server Monitoring Dashboard with Slack Integration",
      description: "Real-time server and website uptime monitoring system built with Prometheus, Node Exporter, Blackbox Exporter, and Grafana featuring automated Slack alerting.",
      link: "/project-showcase-github/server-monitoring.pdf",
    },
    {
      title: "PostgreSQL Monitoring Platform on Kubernetes",
      description: "Enterprise-grade PostgreSQL deployment on Kubernetes with PgAdmin management interface and comprehensive monitoring via Prometheus and Grafana.",
      link: "https://medium.com/@haidersarfraz0323/you-can-check-that-your-kubernetes-node-is-running-with-ea2c5fc9ec2d",
    },
    {
      title: "Windows System Health Monitor",
      description: "Real-time Windows system monitoring dashboard with Grafana and Prometheus integration for tracking CPU, memory, disk, and network performance metrics.",
      link: "https://medium.com/@haidersarfraz0323/visualize-windows-system-health-in-real-time-with-grafana-and-prometheus-e40700650afa",
    },
    {
      title: "Kubernetes GitOps Deployment Pipeline",
      description: "Automated application deployment system implementing GitOps methodology with Kubernetes and Argo CD for continuous delivery and infrastructure management.",
      link: "https://medium.com/@haidersarfraz0323/how-to-deploy-applications-on-kubernetes-using-gitops-and-argo-cd-0fb9ef5d15f8",
    },
    {
      title: "AWS Cloud Security Monitoring System",
      description: "Comprehensive security monitoring platform using AWS CloudTrail, CloudWatch, and SNS for real-time threat detection and automated security alerts.",
      link: "https://medium.com/@haidersarfraz0323/build-a-security-monitoring-system-on-aws-cloudtrail-cloudwatch-sns-079e47494556",
    },
    {
      title: "Windows Remote Desktop Access Portal",
      description: "Secure Windows RDP configuration system with user management, connection troubleshooting, and enhanced security protocols for remote access.",
      link: "/project-showcase-github/Window_Rdp_Connection.pdf",
    },
    {
      title: "AWS Multi-Environment CI/CD Pipeline",
      description: "Automated deployment pipeline for development and staging environments with AWS EC2, Application Load Balancer, SSL certificates, and custom domain configuration.",
      link: "/project-showcase-github/Code_Pipeline_Dev_Staging_Certificate_LoadBalancer_Domain.pdf",
    },
    {
      title: "Monster Rolodex",
      description: "A React application that displays a collection of monsters with search functionality and responsive design.",
      link: "https://github.com/haiderali9-9/-monster-rolodox",
    },
    {
      title: "Meal Search",
      description: "An application to search for meals and recipes with detailed information and instructions.",
      link: "https://github.com/haiderali9-9/mealsearch",
    },
    {
      title: "Find Pokemon",
      description: "A Pokemon search application built with modern web technologies to explore and discover Pokemon.",
      link: "https://github.com/haiderali9-9/FindPokemon",
    },
    {
      title: "Carpool",
      description: "A carpooling platform to connect drivers and passengers for shared rides and sustainable transportation.",
      link: "https://github.com/haiderali9-9/Carpool",
    },
  ];

  const filteredProjects = projects.filter((project) => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative">
      <Starfield />
      <ThemeToggle />
      <div className="relative z-10">
        <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="space-y-0">
          {/* Projects Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="projects">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] bg-clip-text text-transparent">
                  Featured Projects
                </h2>
                <p className="text-muted-foreground text-lg">
                  Real-world implementations showcasing DevOps excellence
                </p>
              </div>
            </ScrollReveal>

            {filteredProjects.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg text-muted-foreground">No projects found matching your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ScrollReveal key={index} delay={index * 100}>
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      link={project.link}
                    />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </section>

          {/* Skills Section */}
          <Skills />

          {/* Contact Section */}
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
