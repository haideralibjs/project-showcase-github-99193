import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Download, FileText } from "lucide-react";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Dockerfiles = () => {
  const navigate = useNavigate();
  
  const dockerfiles = [
    {
      title: "PHP-FPM with Nginx",
      description: "Multi-stage Docker setup for PHP applications with Nginx web server and PHP-FPM for optimal performance.",
      technologies: ["Docker", "PHP-FPM", "Nginx", "Composer"],
      content: `FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    nginx \\
    supervisor \\
    cron

# Configure PHP-FPM
COPY custom-fpm-setting.conf /usr/local/etc/php-fpm.d/

# Configure Nginx
COPY nginx.conf /etc/nginx/sites-available/default

# Setup supervisor
COPY supervisor/php-artisan.conf /etc/supervisor/conf.d/

CMD ["/usr/bin/supervisord", "-n"]`,
    },
    {
      title: "Node.js Application",
      description: "Production-ready Node.js Dockerfile with multi-stage build for optimized image size.",
      technologies: ["Docker", "Node.js", "npm"],
      content: `FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["node", "server.js"]`,
    },
    {
      title: "Python Flask Application",
      description: "Containerized Python Flask app with proper dependency management and security best practices.",
      technologies: ["Docker", "Python", "Flask", "Gunicorn"],
      content: `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]`,
    },
    {
      title: "PostgreSQL with Custom Config",
      description: "PostgreSQL container with custom configuration for performance tuning and data persistence.",
      technologies: ["Docker", "PostgreSQL"],
      content: `FROM postgres:15-alpine

# Copy custom PostgreSQL configuration
COPY postgresql.conf /etc/postgresql/postgresql.conf

# Set environment variables
ENV POSTGRES_DB=myapp
ENV POSTGRES_USER=admin
ENV PGDATA=/var/lib/postgresql/data/pgdata

EXPOSE 5432

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]`,
    },
    {
      title: "React Application",
      description: "Multi-stage build for React apps with Nginx serving static files in production.",
      technologies: ["Docker", "React", "Nginx", "Node.js"],
      content: `FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
    },
    {
      title: "MongoDB with Authentication",
      description: "MongoDB container with authentication enabled and custom initialization scripts.",
      technologies: ["Docker", "MongoDB"],
      content: `FROM mongo:7.0

# Copy initialization script
COPY mongo-init.js /docker-entrypoint-initdb.d/

ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=secure_password
ENV MONGO_INITDB_DATABASE=myapp

EXPOSE 27017

CMD ["mongod", "--auth"]`,
    },
    {
      title: ".NET 8.0 Application",
      description: "Multi-stage build for .NET applications with ASP.NET Core runtime for production deployment.",
      technologies: ["Docker", ".NET", "ASP.NET Core"],
      content: `# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY ["MyWebApp/MyWebApp.csproj", "MyWebApp/"]
RUN dotnet restore "MyWebApp/MyWebApp.csproj"

# Copy source code and build
COPY . .
WORKDIR "/src/MyWebApp"
RUN dotnet build "MyWebApp.csproj" -c Release -o /app/build

# Stage 2: Publish the application
FROM build AS publish
RUN dotnet publish "MyWebApp.csproj" -c Release -o /app/publish

# Stage 3: Create runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "MyWebApp.dll"]`,
    },
  ];

  const handleDownload = (title: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-Dockerfile`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Docker Files Collection</h1>
                <p className="text-muted-foreground mt-1">
                  Production-ready Dockerfiles for various technologies
                </p>
              </div>
            </div>
            <Button onClick={() => navigate("/")} variant="outline">
              ← Back to Projects
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dockerfiles.map((dockerfile, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {dockerfile.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {dockerfile.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {dockerfile.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-64">
                  <code>{dockerfile.content}</code>
                </pre>
                <Button
                  onClick={() => handleDownload(dockerfile.title, dockerfile.content)}
                  className="w-full mt-4"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Dockerfile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dockerfiles;
