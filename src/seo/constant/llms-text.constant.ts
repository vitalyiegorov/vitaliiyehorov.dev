import { site } from '@/site/constant/site.constant';

export const llmsText = `# ${site.name}

> ${site.jobTitle} at ${site.employer} in Vienna, Austria. 15+ years in software, ex-founder, ex-CTO, hands-on TypeScript engineer who leads a product engineering team and runs a multi-provider fleet of AI coding agents.

Personal site: ${site.url}. Last updated: ${site.updated}.

## Profile

- Role: ${site.jobTitle}, ${site.employer} (${site.employerUrl}), B2B SaaS asset operations platform, since 2023
- Previously: CTO at OnTheWay (2021-2023), VP of Engineering at Clearmove (2019-2021), CTO at Omnivalor (2017-2019), Founder and CEO of SamsonOS (2010-2017)
- Stack: TypeScript, Node.js, NestJS, React, React Native, Next.js, Go, CI/CD, monorepos, microservices
- Languages: English, Ukrainian
- Location: Vienna, Austria

## How he works with AI agents

One session plans the work, agents from different model families build it in parallel, and a council of one reviewer per family reads every diff before merge. A UI change stays only if it wins a blind before-and-after vote.

## Numbers (as of Nov 2026)

- GitHub, last 12 months: 35,058 contributions, 2,301 pull requests
- 3,727 agent sessions orchestrated
- 26 open-source npm packages (rnw-community)

## Selected work

- [Budgie](https://www.budgie.at): privacy-first, offline-first money app with an AI chat over your own data ([source](https://github.com/budgie-at/budgie))
- [Suuudokuuu](https://suuudokuuu.com): sudoku for web, iOS and Android from one codebase ([source](https://github.com/vitalyiegorov/suuudokuuu))
- [JointLens](https://jointlens.ai): an AI second opinion on MRI, CT and X-ray scans of eleven joints
- [rnw-community](https://github.com/rnw-community/rnw-community): 26 npm packages for NestJS and React Native. The largest gets 325k downloads a month
- [Tart Runner Fleet](https://github.com/vitalyiegorov/tart-runner-fleet): GitHub Actions runners on Apple-silicon Macs, every job in a throwaway VM
- [Agent tooling](https://github.com/pingdotgg/t3code/pulls?q=is%3Apr+author%3Avitalyiegorov): 30 pull requests to t3code, plus fixes to simlock, agent-device and simslim

## Contact

- LinkedIn: ${site.linkedin}
- GitHub: ${site.github}
- Email: ${site.email}
`;
