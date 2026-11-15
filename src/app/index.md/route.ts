import { llmsFullText } from '@/seo/constant/llms-full-text.constant';

export function GET(): Response {
    return new Response(llmsFullText, { headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' } });
}
