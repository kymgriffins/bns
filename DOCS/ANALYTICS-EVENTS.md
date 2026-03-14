# BNS Analytics Event Schema (2026)

Unified event names and parameters for conversion and funnel analysis.

## Event: `bns_cta_click`

Fired when a user clicks a primary or secondary CTA.

| Parameter | Type   | Description                    |
|-----------|--------|--------------------------------|
| `location`| string | One of: hero_primary, hero_secondary, section_reports, section_learn, section_take_action, section_donate, learn_hub, budget_101, media_hub, footer |
| `label`   | string | Button/link label (e.g. "Start Budget 101") |
| `href`    | string | Optional destination path or URL |

## Event: `bns_module_progress`

Fired when a user advances or completes a learning module (e.g. Budget 101).

| Parameter        | Type    | Description                          |
|------------------|---------|--------------------------------------|
| `module_id`      | string  | e.g. "budget-101"                    |
| `step`           | string  | Chapter or step identifier           |
| `progress_percent`| number | 0–100                                |
| `completed`      | boolean | Whether the module was completed     |

## Event: `bns_donation_step`

Fired at key steps in the donation flow.

| Parameter | Type   | Description                    |
|-----------|--------|--------------------------------|
| `step`    | string | One of: view, start, complete, abandon |
| `amount`  | number | Optional amount (e.g. KES)     |

## Usage

```ts
import {
  trackBnsCtaClick,
  trackBnsModuleProgress,
  trackBnsDonationStep,
} from '@/lib/analytics';

// CTA click
trackBnsCtaClick('hero_primary', 'Start Budget 101', '/learn/budget-101');

// Module progress
trackBnsModuleProgress('budget-101', 'chapter_2', 40, false);

// Donation
trackBnsDonationStep('start');
trackBnsDonationStep('complete', 5000);
```

Existing events (page_view, newsletter_subscribe, donation_start, etc.) remain in use; these BNS-prefixed events complement them for funnel reporting.
