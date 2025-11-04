import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Download, FileText } from "lucide-react";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Dockerfiles = () => {
  const navigate = useNavigate();
  
  const dockerfiles = [
    {
      title: "PHP-FPM with Nginx & Laravel",
      description: "Production-ready PHP 8.2 FPM with Nginx, Supervisor, complete Laravel setup including migrations, asset building, and optimized caching.",
      technologies: ["Docker", "PHP-FPM", "Nginx", "Laravel", "Composer", "Supervisor"],
      content: `# Base image
FROM php:8.2-fpm-alpine

# Set default environment
ENV APP_ENV=production

# Set working directory
WORKDIR /var/www/html

# Install system dependencies + PHP extensions
RUN apk add --no-cache \\
    curl zip unzip git nodejs npm nginx supervisor gcc g++ make autoconf \\
    libpng-dev libjpeg-turbo-dev libwebp-dev freetype-dev \\
    oniguruma-dev libxml2-dev icu-dev zlib-dev libzip-dev \\
    && docker-php-ext-configure gd \\
        --with-freetype \\
        --with-jpeg \\
        --with-webp \\
    && docker-php-ext-install -j$(nproc) \\
        gd pdo pdo_mysql mbstring xml intl zip bcmath opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy and activate PHP configuration
RUN cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini

# Copy production configuration files
COPY configuration/production/custom-php-setting.ini /usr/local/etc/php/conf.d/custom-php-setting.ini
COPY configuration/production/nginx.conf /etc/nginx/nginx.conf

# Copy Supervisor configuration file
COPY ./supervisor/supervisor.conf /etc/supervisor/conf.d/supervisor.conf

# Copy application code
COPY . .

# Mark /var/www/html as safe for git
RUN git config --global --add safe.directory /var/www/html

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Install JavaScript dependencies
RUN npm install

# Build frontend assets
RUN npm run build

# Cache Laravel config/routes/views and run migrations
RUN php artisan config:clear && \\
    php artisan config:cache && \\
    php artisan view:cache && \\
    php artisan migrate --force

# Set correct permissions
RUN chown -R www-data:www-data /var/www/html && \\
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Switch to non-root user
USER root

# Expose PHP-FPM port
EXPOSE 80

# Start Supervisor (manages PHP-FPM + Nginx)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisor.conf"]`,
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
