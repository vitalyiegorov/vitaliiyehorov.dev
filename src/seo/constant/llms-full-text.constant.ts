import { site } from '@/site/constant/site.constant';

export const llmsFullText = `# ${site.name}

> ${site.jobTitle} at ${site.employer} in Vienna, Austria. 15+ years in software, ex-founder, ex-CTO, hands-on TypeScript engineer who leads a product engineering team and runs a multi-provider fleet of AI coding agents.

Source: ${site.url}. This file holds the full text of the site as Markdown. The short index is at ${site.url}/llms.txt. Last updated: ${site.updated}.

## About

I lead engineers and a fleet of AI agents. Both ship to production.

- Role: ${site.jobTitle} at ${site.employer} (${site.employerUrl}), Vienna, since 2023
- Experience: 15+ years in software, ex-founder, ex-CTO, still writes code
- Languages: English, Ukrainian
- Location: Vienna, Austria (48.2082° N, 16.3738° E)

## Numbers: one year, counted (12 months to Nov 2026)

- 35,058 GitHub contributions
- 2,301 pull requests
- 3,727 agent sessions orchestrated
- 26 open-source npm packages

## Method: how I work with agents

One orchestrator. Many agents. Nothing merges unreviewed. I plan the work, agents build it in parallel, and I own the merge.

1. Plan once: one session reads the code, writes the plan and splits it into narrow briefs.
2. Fan out: agents from different model families build in parallel.
3. Review by council: one reviewer per model family reads the diff. A UI change stays only if it wins a blind before-and-after vote.

Model families in rotation: Claude, GPT, Gemini, DeepSeek.

## Career: fifteen years of building teams that ship

### Engineering Manager, ${site.employer}, Vienna (2023 to now)

Product engineering for a B2B asset operations platform. AI-native engineering is the team's daily work.

### CTO, OnTheWay, Nürnberg (2021 to 2023)

A logistics marketplace from MVP to production, with a team of five.

### VP of Engineering, Clearmove, Kyiv and London (2019 to 2021)

Built R&D from zero to 20+ engineers.

### CTO, Omnivalor, Kyiv and Stockholm (2017 to 2019)

Two teams, one e-commerce SaaS.

### Founder and CEO, SamsonOS, Kyiv (2010 to 2017)

40+ projects for startups in Europe and the US. A team of 20+ engineers.

## Selected work: things I build and maintain

### Budgie

Open source, React Native. Privacy-first, offline-first money app with an AI chat over your own data.

- Site: https://www.budgie.at
- Source: https://github.com/budgie-at/budgie

### Suuudokuuu

Open source, Expo. Sudoku for web, iOS and Android from one codebase.

- App Store: https://apps.apple.com/app/id6449440933
- Google Play: https://play.google.com/store/apps/details?id=com.vitaliiyehorov.suuudokuuu
- Site: https://suuudokuuu.com
- Source: https://github.com/vitalyiegorov/suuudokuuu

### Pony Garden

Game, Swift, iPad and Mac. Solve hedge mazes and care for a pony. Offline play for ages 4 to 7, with no ads, accounts or in-app purchases.

- App Store: https://apps.apple.com/app/id6814132709

### JointLens

Product, Next.js and LLMs. An AI second opinion on MRI, CT and X-ray scans of eleven joints. Several models read the scan and agree on one report.

- Site: https://jointlens.ai

### rnw-community

Open source, TypeScript. 26 npm packages for NestJS and React Native. The largest gets 325k downloads a month.

- Source: https://github.com/rnw-community/rnw-community

### Unyoke

Open source, Go. GitHub Actions on your own Macs and Linux boxes. Every job gets a throwaway VM or container.

- Site: https://unyoke.dev
- Source: https://github.com/vitalyiegorov/tart-runner-fleet

### Agent tooling

Upstream contributions. 30 pull requests opened to t3code, plus fixes to simlock, agent-device and simslim.

- t3code: https://github.com/pingdotgg/t3code/pulls?q=is%3Apr+author%3Avitalyiegorov
- simlock: https://github.com/callstackincubator/simlock
- agent-device: https://github.com/callstack/agent-device
- simslim: https://github.com/MobAI-App/simslim

## Contact

Building with AI agents, or leading a team that does? Write to me.

- LinkedIn: ${site.linkedin}
- GitHub: ${site.github}
- Email: ${site.email}
`;
