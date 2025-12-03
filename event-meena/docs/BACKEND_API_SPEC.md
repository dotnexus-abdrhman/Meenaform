# Backend API Specification - Send Event Feature

## Overview
This document describes the expected API structure for the "Send Event to Contacts" feature.

## Endpoint: Send Event

### Request
```
POST /api/events/send
Content-Type: application/json
```

### Request Body Structure

#### When sending to individual contacts:
```json
{
  "eventId": "evt_123456",
  "eventTitle": "حدث تجريبي",
  "eventUrl": "https://example.com/events/evt_123456",
  "emails": [
    "ahmed@example.com",
    "fatima@example.com",
    "mohammed@example.com"
  ],
  "phones": [
    "+966501234567",
    "+966507654321",
    "+966509876543"
  ],
  "contactIds": [
    "contact_1",
    "contact_2",
    "contact_3"
  ]
}
```

#### When sending to groups:
```json
{
  "eventId": "evt_123456",
  "eventTitle": "حدث تجريبي",
  "eventUrl": "https://example.com/events/evt_123456",
  "emails": [
    "ahmed@example.com",
    "fatima@example.com",
    "mohammed@example.com",
    "sara@example.com"
  ],
  "phones": [
    "+966501234567",
    "+966507654321",
    "+966509876543",
    "+966508765432"
  ],
  "groupIds": [
    "group_1",
    "group_2"
  ],
  "contactIds": [
    "contact_1",
    "contact_2",
    "contact_3",
    "contact_4"
  ]
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `eventId` | string | Yes | Unique identifier for the event |
| `eventTitle` | string | Yes | Title of the event |
| `eventUrl` | string | Yes | URL link to the event details page |
| `emails` | string[] | Yes | Array of email addresses to send to |
| `phones` | string[] | Yes | Array of phone numbers for WhatsApp |
| `contactIds` | string[] | Yes | Array of contact IDs for tracking |
| `groupIds` | string[] | No | Array of group IDs (only when sending to groups) |

### Expected Backend Behavior

1. **Email Sending:**
   - Send event invitation email to all addresses in `emails` array
   - Email should contain:
     - Event title
     - Event details
     - Link to event page (`eventUrl`)
     - Professional email template

2. **WhatsApp Sending:**
   - Send event invitation via WhatsApp to all numbers in `phones` array
   - Message should contain:
     - Event title
     - Brief event description
     - Link to event page (`eventUrl`)

3. **Tracking:**
   - Store send history with:
     - Timestamp
     - Event ID
     - Contact/Group IDs
     - Delivery status

### Response Structure

#### Success Response (200 OK):
```json
{
  "success": true,
  "message": "تم إرسال الحدث بنجاح",
  "data": {
    "sentAt": "2025-11-03T10:30:00Z",
    "totalRecipients": 3,
    "emailsSent": 3,
    "whatsappSent": 3,
    "sendId": "send_789012"
  }
}
```

#### Error Response (400/500):
```json
{
  "success": false,
  "message": "فشل إرسال الحدث",
  "error": {
    "code": "SEND_FAILED",
    "details": "Error details here"
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `INVALID_REQUEST` | Missing or invalid request data |
| `EVENT_NOT_FOUND` | Event ID does not exist |
| `EMAIL_SEND_FAILED` | Failed to send emails |
| `WHATSAPP_SEND_FAILED` | Failed to send WhatsApp messages |
| `SEND_FAILED` | General send failure |

## Frontend Implementation Notes

- The frontend is already prepared to send data in this format
- Check console for `📧 Data ready for backend:` log to see the exact data structure
- Replace the TODO comment in `SendEventDialog.tsx` with actual API call
- The frontend handles loading states and error messages

## Testing

### Test Cases:
1. ✅ Send to single contact
2. ✅ Send to multiple contacts
3. ✅ Send to all contacts (Select All)
4. ✅ Send to single group
5. ✅ Send to multiple groups
6. ✅ Handle empty email/phone arrays
7. ✅ Handle API errors gracefully

## Security Considerations

- Validate all email addresses
- Validate all phone numbers (international format)
- Rate limiting for send operations
- Authentication/Authorization required
- Prevent spam/abuse

