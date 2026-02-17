import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { OrganizationProfile, OrganizationProfileUpdate } from "@/types/organization";

/**
 * GET /api/organization
 * Fetch the current organization profile
 * Public endpoint - no authentication required
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Use the get_current_organization function to fetch the active organization
    const { data, error } = await supabase.rpc('get_current_organization');

    if (error) {
      console.error('Error fetching organization:', error);
      return NextResponse.json(
        { error: 'Failed to fetch organization profile' },
        { status: 500 }
      );
    }

    // If no organization exists, return null
    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No organization profile found' },
        { status: 404 }
      );
    }

    const organization: OrganizationProfile = data[0];

    return NextResponse.json({ data: organization }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/organization
 * Update the organization profile
 * Requires authentication - only authorized users can update
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please log in to update the organization profile' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body: OrganizationProfileUpdate = await request.json();

    // Server-side validation
    const validationErrors = validateOrganizationData(body);
    
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Get the current organization ID
    const { data: currentOrg, error: fetchError } = await supabase.rpc('get_current_organization');

    if (fetchError || !currentOrg || currentOrg.length === 0) {
      return NextResponse.json(
        { error: 'No organization found to update' },
        { status: 404 }
      );
    }

    const organizationId = currentOrg[0].id;

    // Prepare update data with updated_by
    const updateData = {
      ...body,
      updated_by: user.id,
    };

    // Update the organization profile
    const { data, error } = await supabase
      .from('organization_profile')
      .update(updateData)
      .eq('id', organizationId)
      .select()
      .single();

    if (error) {
      console.error('Error updating organization:', error);
      return NextResponse.json(
        { error: 'Failed to update organization profile' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        data: data as OrganizationProfile, 
        message: 'Organization profile updated successfully',
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Server-side validation for organization data
 */
function validateOrganizationData(data: OrganizationProfileUpdate): string[] {
  const errors: string[] = [];

  // Validate organization name
  if (data.organization_name !== undefined) {
    if (!data.organization_name || data.organization_name.trim().length < 2) {
      errors.push('Organization name must be at least 2 characters');
    }
    if (data.organization_name.length > 200) {
      errors.push('Organization name must not exceed 200 characters');
    }
  }

  // Validate email format
  if (data.contact_email !== undefined && data.contact_email !== null) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contact_email)) {
      errors.push('Invalid email format');
    }
  }

  // Validate website URL format
  if (data.website_url !== undefined && data.website_url !== null) {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (!urlRegex.test(data.website_url)) {
      errors.push('Invalid website URL format');
    }
  }

  // Validate phone format
  if (data.contact_phone !== undefined && data.contact_phone !== null) {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!phoneRegex.test(data.contact_phone) || data.contact_phone.length < 10) {
      errors.push('Invalid phone number format');
    }
  }

  // Validate social media URLs
  const socialFields = ['facebook_url', 'twitter_url', 'instagram_url', 'linkedin_url', 'youtube_url'];
  const socialUrlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  
  for (const field of socialFields) {
    const value = data[field as keyof OrganizationProfileUpdate];
    if (value !== undefined && value !== null && !socialUrlRegex.test(value)) {
      errors.push(`Invalid ${field.replace('_url', '')} URL format`);
    }
  }

  // Validate founded year
  if (data.founded_year !== undefined && data.founded_year !== null) {
    const currentYear = new Date().getFullYear() + 1;
    if (data.founded_year < 1900 || data.founded_year > currentYear) {
      errors.push(`Founded year must be between 1900 and ${currentYear}`);
    }
  }

  return errors;
}
