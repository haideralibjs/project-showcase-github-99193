import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Download, FileText } from "lucide-react";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Pipelines = () => {
  const navigate = useNavigate();
  
  const pipelines = [
    {
      title: "GitHub Actions - SSH Deployment",
      description: "Automated deployment pipeline using GitHub Actions with SSH connection to remote server for continuous deployment.",
      technologies: ["GitHub Actions", "SSH", "Ubuntu"],
      type: "GitHub Actions",
      content: `on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: "SSH Into the system"
        run: |
          echo "\${{ vars.KEY }}" >> key.pem.b64
          base64 --decode key.pem.b64 > key.pem
          chmod 600 key.pem   
          ssh -i key.pem -o StrictHostKeyChecking=no haideralibjssoftsolution@136.115.207.167`,
      filename: "github-actions-ssh.yml"
    },
    {
      title: "Azure DevOps - Docker Deployment",
      description: "Azure DevOps pipeline with self-hosted agent for building and deploying Docker containers with automated testing.",
      technologies: ["Azure DevOps", "Docker", "ASP.NET Core"],
      type: "Azure DevOps",
      content: `trigger:
- main  # or your branch name

pool:
  name: devops1  # your self-hosted agent pool

steps:
# Step 1: Checkout source
- checkout: self
  displayName: 'Checkout source code'

# Step 2: Build Docker image
- script: |
    echo "Building Docker image..."
    docker build -t mywebapp .
  displayName: 'Build Docker Image'

# Step 3: Remove old container if exists & run new one
- script: |
    echo "Stopping and removing existing container (if any)..."
    docker rm -f mywebapp_container || echo "No existing container"
    echo "Running new container..."
    docker run -d -p 8080:80 -e ASPNETCORE_URLS=http://+:80 --name mywebapp_container mywebapp
  displayName: 'Run Docker Container'

# Step 4: Verify container is running
- powershell: |
    Write-Host "Listing running containers..."
    docker ps
    Write-Host "Testing application endpoint..."
    Invoke-WebRequest -Uri http://localhost:8080 -UseBasicParsing
  displayName: 'Verify App is Running'`,
      filename: "azure-pipelines.yml"
    },
  ];

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
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
                <h1 className="text-3xl font-bold">CI/CD Pipeline Collection</h1>
                <p className="text-muted-foreground mt-1">
                  Production-ready pipeline configurations for automated deployments
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
          {pipelines.map((pipeline, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {pipeline.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {pipeline.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {pipeline.technologies.map((tech, i) => (
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
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{pipeline.content}</code>
                </pre>
                <Button
                  onClick={() => handleDownload(pipeline.filename, pipeline.content)}
                  className="w-full mt-4"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download {pipeline.type} Config
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

export default Pipelines;
