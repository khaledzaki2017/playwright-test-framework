import type { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import axios from 'axios';

class JiraReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status !== 'failed') return;

    const summary = `Test Failed: ${test.title}`;
    const description = `
**Project:** ${test.parent.title}
**Status:** ${result.status}
**Error:** ${result.error?.message}
**Location:** ${test.location.file}:${test.location.line}
    `;

    await axios.post(
      'https://<your-domain>.atlassian.net/rest/api/3/issue',
      {
        fields: {
          project: { key: 'YOUR_PROJECT_KEY' },
          summary,
          description,
          issuetype: { name: 'Bug' },
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from('email@example.com:your_api_token').toString('base64')}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`Jira ticket created for failed test: ${test.title}`);
  }
}

export default JiraReporter;
