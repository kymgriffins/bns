"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { OrganizationProfile, OrganizationProfileUpdate } from "@/types/organization";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar,
  Save,
  RefreshCw,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

// Validation helper functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUrl(url: string): boolean {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return urlRegex.test(url);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
}

// Form validation errors
interface FormErrors {
  [key: string]: string;
}

// Loading skeleton component
function FormSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

// Auth check component
async function AuthCheck({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/auth/login?redirect=/admin/organization');
  }

  return <>{children}</>;
}

// Success message component
function SuccessMessage({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
      <CheckCircle className="h-5 w-5" />
      <p>{message}</p>
    </div>
  );
}

// Error message component
function ErrorMessage({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
      <AlertCircle className="h-5 w-5" />
      <p>{message}</p>
      <button onClick={onDismiss} className="ml-auto text-sm underline">
        Dismiss
      </button>
    </div>
  );
}

// Main organization edit form component
export default function OrganizationEditPage() {
  const [organization, setOrganization] = useState<OrganizationProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  // Form state
  const [formData, setFormData] = useState<OrganizationProfileUpdate>({});

  // Fetch organization data
  const fetchOrganization = async () => {
    setFetching(true);
    setError(null);
    
    try {
      const response = await fetch('/api/organization');
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch organization');
      }
      
      const data = await response.json();
      setOrganization(data.data);
      setFormData(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setFetching(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value || null }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Organization name validation
    if (!formData.organization_name || formData.organization_name.trim().length < 2) {
      newErrors.organization_name = 'Organization name is required (min 2 characters)';
    }

    // Email validation
    if (formData.contact_email && !validateEmail(formData.contact_email)) {
      newErrors.contact_email = 'Please enter a valid email address';
    }

    // Website validation
    if (formData.website_url && !validateUrl(formData.website_url)) {
      newErrors.website_url = 'Please enter a valid URL';
    }

    // Phone validation
    if (formData.contact_phone && !validatePhone(formData.contact_phone)) {
      newErrors.contact_phone = 'Please enter a valid phone number';
    }

    // Social media URL validations
    const socialFields = [
      'facebook_url', 'twitter_url', 'instagram_url', 
      'linkedin_url', 'youtube_url'
    ];
    
    for (const field of socialFields) {
      const value = formData[field as keyof OrganizationProfileUpdate];
      if (value && !validateUrl(value)) {
        newErrors[field] = 'Please enter a valid URL';
      }
    }

    // Year validation
    if (formData.founded_year) {
      const year = parseInt(String(formData.founded_year));
      const currentYear = new Date().getFullYear() + 1;
      if (year < 1900 || year > currentYear) {
        newErrors.founded_year = `Year must be between 1900 and ${currentYear}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Client-side validation
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch('/api/organization', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update organization');
      }

      setOrganization(data.data);
      setSuccess('Organization profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <FormSkeleton />
      </div>
    );
  }

  if (error && !organization) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-destructive">{error}</p>
              <Button variant="outline" onClick={fetchOrganization}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Organization Profile</h1>
          <p className="text-muted-foreground">Update your organization's public information</p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <SuccessMessage message={success} onDismiss={() => setSuccess(null)} />
      )}
      
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                The main details about your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization_name">
                    Organization Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="organization_name"
                    name="organization_name"
                    value={formData.organization_name || ''}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    aria-invalid={!!errors.organization_name}
                    aria-describedby={errors.organization_name ? "organization_name-error" : undefined}
                  />
                  {errors.organization_name && (
                    <p id="organization_name-error" className="text-sm text-destructive">
                      {errors.organization_name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    value={formData.tagline || ''}
                    onChange={handleChange}
                    placeholder="A short tagline or slogan"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  placeholder="Describe your organization..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mission">Mission</Label>
                  <Textarea
                    id="mission"
                    name="mission"
                    value={formData.mission || ''}
                    onChange={handleChange}
                    placeholder="Your organization's mission statement"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vision">Vision</Label>
                  <Textarea
                    id="vision"
                    name="vision"
                    value={formData.vision || ''}
                    onChange={handleChange}
                    placeholder="Your organization's vision statement"
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry || ''}
                    onChange={handleChange}
                    placeholder="e.g., Non-profit"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization_type">Organization Type</Label>
                  <Input
                    id="organization_type"
                    name="organization_type"
                    value={formData.organization_type || ''}
                    onChange={handleChange}
                    placeholder="e.g., NGO, Company"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="founded_year">Founded Year</Label>
                  <Input
                    id="founded_year"
                    name="founded_year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.founded_year || ''}
                    onChange={handleChange}
                    placeholder="e.g., 2023"
                  />
                  {errors.founded_year && (
                    <p className="text-sm text-destructive">{errors.founded_year}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How people can reach your organization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email
                  </Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    value={formData.contact_email || ''}
                    onChange={handleChange}
                    placeholder="contact@organization.ke"
                    aria-invalid={!!errors.contact_email}
                  />
                  {errors.contact_email && (
                    <p className="text-sm text-destructive">{errors.contact_email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_phone">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone
                  </Label>
                  <Input
                    id="contact_phone"
                    name="contact_phone"
                    type="tel"
                    value={formData.contact_phone || ''}
                    onChange={handleChange}
                    placeholder="+254 700 000 000"
                    aria-invalid={!!errors.contact_phone}
                  />
                  {errors.contact_phone && (
                    <p className="text-sm text-destructive">{errors.contact_phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website_url">
                  <Globe className="inline h-4 w-4 mr-1" />
                  Website URL
                </Label>
                <Input
                  id="website_url"
                  name="website_url"
                  type="url"
                  value={formData.website_url || ''}
                  onChange={handleChange}
                  placeholder="https://organization.ke"
                  aria-invalid={!!errors.website_url}
                />
                {errors.website_url && (
                  <p className="text-sm text-destructive">{errors.website_url}</p>
                )}
              </div>

              <Separator className="my-4" />

              <Label>Address</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address_line1" className="text-sm">Address Line 1</Label>
                  <Input
                    id="address_line1"
                    name="address_line1"
                    value={formData.address_line1 || ''}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_line2" className="text-sm">Address Line 2</Label>
                  <Input
                    id="address_line2"
                    name="address_line2"
                    value={formData.address_line2 || ''}
                    onChange={handleChange}
                    placeholder="Apartment, suite, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleChange}
                    placeholder="e.g., Nairobi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm">State/County</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleChange}
                    placeholder="e.g., Nairobi County"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal_code" className="text-sm">Postal Code</Label>
                  <Input
                    id="postal_code"
                    name="postal_code"
                    value={formData.postal_code || ''}
                    onChange={handleChange}
                    placeholder="e.g., 00100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChange}
                    placeholder="e.g., Kenya"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Details */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
              <CardDescription>
                Legal registration information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="registration_number">Registration Number</Label>
                  <Input
                    id="registration_number"
                    name="registration_number"
                    value={formData.registration_number || ''}
                    onChange={handleChange}
                    placeholder="e.g., OP/2023/001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax_id">Tax ID</Label>
                  <Input
                    id="tax_id"
                    name="tax_id"
                    value={formData.tax_id || ''}
                    onChange={handleChange}
                    placeholder="e.g., A123456789"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Your organization's social media presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook URL</Label>
                  <Input
                    id="facebook_url"
                    name="facebook_url"
                    type="url"
                    value={formData.facebook_url || ''}
                    onChange={handleChange}
                    placeholder="https://facebook.com/organization"
                    aria-invalid={!!errors.facebook_url}
                  />
                  {errors.facebook_url && (
                    <p className="text-sm text-destructive">{errors.facebook_url}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter_url">Twitter/X URL</Label>
                  <Input
                    id="twitter_url"
                    name="twitter_url"
                    type="url"
                    value={formData.twitter_url || ''}
                    onChange={handleChange}
                    placeholder="https://twitter.com/organization"
                    aria-invalid={!!errors.twitter_url}
                  />
                  {errors.twitter_url && (
                    <p className="text-sm text-destructive">{errors.twitter_url}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram URL</Label>
                  <Input
                    id="instagram_url"
                    name="instagram_url"
                    type="url"
                    value={formData.instagram_url || ''}
                    onChange={handleChange}
                    placeholder="https://instagram.com/organization"
                    aria-invalid={!!errors.instagram_url}
                  />
                  {errors.instagram_url && (
                    <p className="text-sm text-destructive">{errors.instagram_url}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    name="linkedin_url"
                    type="url"
                    value={formData.linkedin_url || ''}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/company/organization"
                    aria-invalid={!!errors.linkedin_url}
                  />
                  {errors.linkedin_url && (
                    <p className="text-sm text-destructive">{errors.linkedin_url}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="youtube_url">YouTube URL</Label>
                  <Input
                    id="youtube_url"
                    name="youtube_url"
                    type="url"
                    value={formData.youtube_url || ''}
                    onChange={handleChange}
                    placeholder="https://youtube.com/@organization"
                    aria-invalid={!!errors.youtube_url}
                  />
                  {errors.youtube_url && (
                    <p className="text-sm text-destructive">{errors.youtube_url}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <Link href="/organization">
              <Button variant="outline" type="button">
                Preview Profile
              </Button>
            </Link>
            
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
