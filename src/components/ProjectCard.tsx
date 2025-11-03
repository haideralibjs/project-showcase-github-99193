import * as React from "react";
import { ExternalLink, Download } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
}

// Get contextual emoji based on project keywords
const getProjectEmoji = (title: string, description: string) => {
  const text = (title + " " + description).toLowerCase();
  
  if (text.includes('windows') || text.includes('rdp') || text.includes('remote desktop')) return '🪟';
  if (text.includes('kubernetes') || text.includes('k8s') || text.includes('docker')) return '🐳';
  if (text.includes('security') || text.includes('monitoring')) return '🔒';
  if (text.includes('aws') || text.includes('cloud')) return '☁️';
  if (text.includes('gitops') || text.includes('argo') || text.includes('git')) return '🔄';
  if (text.includes('pokemon')) return '⚡';
  if (text.includes('monster')) return '👾';
  if (text.includes('meal') || text.includes('food')) return '🍽️';
  if (text.includes('carpool') || text.includes('ride')) return '🚗';
  if (text.includes('react') || text.includes('frontend')) return '⚛️';
  
  return '💼';
};

const ProjectCard = ({ title, description, link }: ProjectCardProps) => {
  const emoji = getProjectEmoji(title, description);
  const [isHovered, setIsHovered] = React.useState(false);
  const isPdf = link.toLowerCase().endsWith('.pdf');
  
  const handleCardClick = () => {
    if (!isPdf) {
      window.open(link, "_blank");
    }
  };
  
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const fileName = link.split('/').pop() || 'document.pdf';
    
    try {
      // Fetch the PDF as a blob to avoid auth redirects
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: open in new tab
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <Card 
      className={`card-hover card-gradient-border group relative overflow-visible ${!isPdf ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contextual emoji indicator */}
      <div className={`absolute -top-3 -right-3 text-4xl transition-all duration-500 z-10 ${isHovered ? 'scale-125 -rotate-12 drop-shadow-2xl' : 'scale-100'}`}>
        <span className="inline-block animate-bounce" style={{ animationDuration: '2s' }}>
          {emoji}
        </span>
      </div>
      
      {/* Glow effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gradient-start)_/_0.1)] to-[hsl(var(--gradient-end)_/_0.1)] rounded-lg -z-10 blur-xl scale-105 transition-all duration-300" />
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-3 bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] bg-clip-text text-transparent pr-8">
          <span className="flex-1">{title}</span>
          {!isPdf && (
            <ExternalLink className="h-6 w-6 text-primary shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-1" />
          )}
        </CardTitle>
        <CardDescription className="text-base mt-3 leading-relaxed">{description}</CardDescription>
        {isPdf && (
          <Button 
            onClick={handleDownload}
            className="w-full mt-4"
            variant="default"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        )}
      </CardHeader>
    </Card>
  );
};

export default ProjectCard;
