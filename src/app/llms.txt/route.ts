import { llmsText } from '@/seo/constant/llms-text.constant';

export function GET(): Response {
    return new Response(llmsText, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
