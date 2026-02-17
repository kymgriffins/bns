"use client";

import { useEffect, useState } from "react";
import type { OrganizationProfile } from "@/types/organization";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  RefreshCw
} from "lucide-react";

// Loading skeleton component for the profile
function ProfileSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        
        <Skeleton className="h-px w-full" />
        
        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Error state component
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-destructive">{message}</p>
            <Button variant="outline" onClick={onRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Social media link component
function SocialLink({ platform, url }: { platform: string; url: string }) {
  const getIcon = () => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      default:
        return <Globe className="h-5 w-5" />;
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      aria-label={`Visit our ${platform}`}
    >
      {getIcon()}
      <span className="text-sm capitalize">{platform}</span>
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

// Contact info item component
function ContactItem({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-3">
      <Icon className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-foreground">{value || 'Not provided'}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}

// Main organization profile component
export default function OrganizationProfilePage() {
  const [organization, setOrganization] = useState<OrganizationProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganization = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/organization');
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch organization');
      }
      
      const data = await response.json();
      setOrganization(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchOrganization} />;
  }

  if (!organization) {
    return (
      <ErrorState 
        message="No organization profile found" 
        onRetry={fetchOrganization} 
      />
    );
  }

  // Build full address
  const fullAddress = [
    organization.address_line1,
    organization.address_line2,
    organization.city,
    organization.state,
    organization.postal_code,
    organization.country,
  ].filter(Boolean).join(', ');

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        {/* Logo */}
        <div className="shrink-0">
          {organization.logo_url ? (
            <img 
              src={organization.logo_url} 
              alt={`${organization.organization_name} logo`}
              className="h-24 w-24 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
          )}
        </div>

        {/* Organization Name & Tagline */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            {organization.organization_name}
          </h1>
          {organization.tagline && (
            <p className="text-lg text-muted-foreground mt-1">
              {organization.tagline}
            </p>
          )}
          {organization.organization_type && (
            <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {organization.organization_type}
            </span>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - About */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {organization.description || 'No description available.'}
              </p>
            </CardContent>
          </Card>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {organization.mission && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-primary">🎯</span>
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    {organization.mission}
                  </p>
                </CardContent>
              </Card>
            )}

            {organization.vision && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-primary">👁️</span>
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    {organization.vision}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Social Media Links */}
          {(organization.facebook_url || organization.twitter_url || 
            organization.instagram_url || organization.linkedin_url || 
            organization.youtube_url) && (
            <Card>
              <CardHeader>
                <CardTitle>Connect With Us</CardTitle>
                <CardDescription>Follow us on social media</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {organization.facebook_url && (
                    <SocialLink platform="Facebook" url={organization.facebook_url} />
                  )}
                  {organization.twitter_url && (
                    <SocialLink platform="Twitter" url={organization.twitter_url} />
                  )}
                  {organization.instagram_url && (
                    <SocialLink platform="Instagram" url={organization.instagram_url} />
                  )}
                  {organization.linkedin_url && (
                    <SocialLink platform="LinkedIn" url={organization.linkedin_url} />
                  )}
                  {organization.youtube_url && (
                    <SocialLink platform="YouTube" url={organization.youtube_url} />
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Contact & Info */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {organization.contact_email && (
                <ContactItem 
                  icon={Mail} 
                  label="Email" 
                  value={organization.contact_email}
                  href={`mailto:${organization.contact_email}`}
                />
              )}
              
              {organization.contact_phone && (
                <ContactItem 
                  icon={Phone} 
                  label="Phone" 
                  value={organization.contact_phone}
                  href={`tel:${organization.contact_phone}`}
                />
              )}
              
              {organization.website_url && (
                <ContactItem 
                  icon={Globe} 
                  label="Website" 
                  value={organization.website_url}
                  href={organization.website_url}
                />
              )}

              {fullAddress && (
                <ContactItem 
                  icon={MapPin} 
                  label="Address" 
                  value={fullAddress}
                />
              )}
            </CardContent>
          </Card>

          {/* Organization Details */}
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {organization.industry && (
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Industry</p>
                    <p className="text-foreground">{organization.industry}</p>
                  </div>
                </div>
              )}

              {organization.founded_year && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Founded</p>
                    <p className="text-foreground">{organization.founded_year}</p>
                  </div>
                </div>
              )}

              {organization.registration_number && (
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Registration</p>
                    <p className="text-foreground">{organization.registration_number}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Last Updated */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Last updated: {new Date(organization.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
