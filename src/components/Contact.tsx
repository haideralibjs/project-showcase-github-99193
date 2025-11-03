import { useState } from "react";
import { Mail, Send, Github, Linkedin, MessageSquare, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent! 🚀",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/haiderali9-9",
      color: "hover:text-[#333] dark:hover:text-white",
      display: "@haiderali9-9",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hyderali99/",
      color: "hover:text-[#0A66C2]",
      display: "linkedin.com/in/hyderali99",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:haidersarfraz0323@gmail.com",
      color: "hover:text-red-500",
      display: "haidersarfraz0323@gmail.com",
    },
    {
      icon: Mail,
      label: "Alternative Email",
      href: "mailto:haider.allee.99@gmail.com",
      color: "hover:text-red-500",
      display: "haider.allee.99@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      href: "tel:+923059903170",
      color: "hover:text-green-500",
      display: "+92 305 990 3170",
    },
  ];

  return (
    <section className="py-20 px-4 relative" id="contact">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--gradient-start))] via-[hsl(var(--gradient-mid))] to-[hsl(var(--gradient-end))] bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind or want to discuss DevOps strategies? I'm always open to interesting conversations and collaboration opportunities.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form - Coming Soon */}
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card shadow-lg">
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <MessageSquare className="h-16 w-16 text-muted-foreground/50" />
                  <h3 className="text-2xl font-semibold">Coming Soon</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Contact form will be available soon. Meanwhile, feel free to reach out through the social links.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Social Links & Info */}
          <ScrollReveal delay={200}>
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Connect With Me</h3>
                <p className="text-muted-foreground mb-6">
                  Find me on these platforms or reach out directly via email. I typically respond within 24-48 hours.
                </p>

                <div className="space-y-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group ${social.color}`}
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <social.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{social.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {social.display}
                        </div>
                      </div>
                      <div className="transform group-hover:translate-x-1 transition-transform">
                        →
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Info Card */}
              <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-accent/5">
                <h4 className="font-semibold mb-3">Quick Info</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available for freelance projects
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Open to full-time opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Remote-friendly
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
