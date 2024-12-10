import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-[#00FF00]">{'{human}'}</span>
          <span className="text-white">loop</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Enhance Team Performance with In-Depth Personality Insights
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/assessment">
            <Button size="lg">
              Start Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}