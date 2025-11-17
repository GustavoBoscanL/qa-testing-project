# Bug Report Format Rules

## Overview

This rule enforces a standardized bug report format for all bug-related issues, documentation, and communication within the project. All bug reports must follow the specified template structure to ensure consistent information gathering and efficient debugging.

## Required Bug Report Template

When creating bug reports, issues, or documenting bugs, **MUST** use the following exact format:

```markdown
---
name: "<description goes here>"
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''
---

### Environment

URL: <url goes here>
Stage: <dev/staging/qa/prod> (if applicable)

<link to screenshot or video>

### Logs

<paste console logs here>

### Network Requests

<paste output from network requests tab here>

### Browser Metadata

| Field      | Value         |
|------------|---------------|
| Browser    | Chrome        |
| Version    | 86.0.4240.198 |
| Dimensions | 1440x887      |
| ...        | ...           |

### Device Metadata

| Field      | Value         |
|------------|---------------|
| Device     | Macbook Pro   |
| Dimensions | 1440x887      |
| ...        | ...           |

### User Data

| Field      | Value                                                         |
|------------|---------------------------------------------------------------|
| Id         | 1Vm7Va                                                        |
| Local Time | Thu Nov 19 2020 20:11:04 GMT-0700 (Mountain Standard Time)    |
| ...        | ...                                                           |

### Custom Data

| Field      | Value         |
|------------|---------------|
| ...        | ...           |
```

## Rules

### MUST - Required Sections

All bug reports **MUST** include the following sections in order:

1. **YAML Front Matter**
   - `name`: Clear, descriptive bug title
   - `about`: Must be "Create a report to help us improve"
   - `title`: Can be empty initially
   - `labels`: Bug classification labels
   - `assignees`: Responsible team members

2. **Environment Section**
   - `URL`: Exact URL where bug occurred
   - `Stage`: Environment (dev/staging/qa/prod)
   - Screenshot or video link (required for UI bugs)

3. **Logs Section**
   - Console logs from browser developer tools
   - Error messages and stack traces
   - Relevant application logs

4. **Network Requests Section**
   - Failed API calls
   - Network tab output from developer tools
   - Request/response details for relevant calls

5. **Browser Metadata Table**
   - Browser name and version
   - Viewport dimensions
   - User agent string
   - Extensions enabled (if relevant)

6. **Device Metadata Table**
   - Device type and model
   - Screen resolution
   - Operating system
   - Hardware specifications (if relevant)

7. **User Data Table**
   - User ID or identifier
   - Local timestamp
   - User permissions/role
   - Session information

8. **Custom Data Table**
   - Project-specific metadata
   - Feature flags
   - Configuration settings
   - Any additional context

### MUST - Content Requirements

**Environment:**
- URL must be complete and accessible
- Stage must be one of: dev, staging, qa, prod
- Screenshot/video required for visual bugs
- Use actual URLs, not placeholders

**Logs:**
- Include full console output, not excerpts
- Preserve timestamps and log levels
- Include both errors and warnings
- Format as code blocks for readability

**Network Requests:**
- Include failed requests with status codes
- Show request headers and payload
- Include response body for errors
- Use browser network tab export when possible

**Metadata Tables:**
- Use exact table format with pipes (|)
- Include actual values, not placeholders
- Add rows as needed with "..." for continuation
- Maintain consistent column alignment

### MUST - Quality Standards

**Completeness:**
- All sections must be present (use "N/A" if not applicable)
- No placeholder text in production reports
- Include sufficient detail for reproduction
- Provide context for non-obvious issues

**Accuracy:**
- Verify all URLs and links work
- Double-check version numbers and timestamps
- Ensure logs match the reported issue
- Validate metadata reflects actual environment

**Clarity:**
- Use descriptive names in YAML front matter
- Write clear, specific descriptions
- Organize information logically
- Avoid technical jargon in user-facing sections

### DON'T - Prohibited Practices

❌ **Never:**
- Skip required sections
- Use generic placeholder text in production
- Include sensitive data (passwords, tokens, PII)
- Submit incomplete reports without justification
- Modify the table structure or section order
- Use different markdown formatting

❌ **Avoid:**
- Vague descriptions like "it doesn't work"
- Screenshots without context or annotations
- Partial log outputs that miss relevant information
- Outdated browser or device information
- Missing reproduction steps

### Application Context

**When to Use:**
- Creating GitHub issues for bugs
- Documenting bugs in project management tools
- Internal bug reports and communication
- QA testing documentation
- Post-mortem incident reports

**File Types:**
- `.md` files for bug documentation
- GitHub issue templates
- Jira issue descriptions
- Confluence documentation
- Internal bug tracking systems

**Integration:**
- Use with existing issue templates
- Incorporate into QA workflows
- Reference in development processes
- Include in documentation standards

## Validation Checklist

Before submitting any bug report, verify:

**Structure:**
- [ ] YAML front matter present and complete
- [ ] All 8 required sections included
- [ ] Tables use correct markdown format
- [ ] Sections appear in specified order

**Content:**
- [ ] Name describes the actual bug
- [ ] URL is complete and accessible
- [ ] Stage matches actual environment
- [ ] Screenshot/video attached for UI issues
- [ ] Console logs include full output
- [ ] Network requests show relevant failures
- [ ] All metadata tables have real values
- [ ] Custom data includes project context

**Quality:**
- [ ] Information is accurate and current
- [ ] Description is clear and specific
- [ ] Sufficient detail for reproduction
- [ ] No sensitive information exposed
- [ ] Links and attachments work properly

## Examples

**Good Bug Report Name:**
```yaml
name: "Login form validation fails for email addresses with plus signs"
```

**Bad Bug Report Name:**
```yaml
name: "Login broken"
```

**Good Environment Section:**
```markdown
### Environment

URL: https://app.example.com/login
Stage: prod

[Screenshot showing validation error](https://imgur.com/abc123)
```

**Good Logs Section:**
```markdown
### Logs

```
[2024-11-16 10:30:15] ERROR: Validation failed for email: user+test@example.com
[2024-11-16 10:30:15] WARN: Regex pattern does not support plus signs
[2024-11-16 10:30:15] INFO: Redirecting to error page
```
```

This rule ensures consistent, comprehensive bug reporting that enables efficient debugging and resolution across all project contexts.

