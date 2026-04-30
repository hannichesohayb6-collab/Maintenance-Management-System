import { LogoCloud } from '@/components/logo-cloud';

export function LogosSection() {
    return (
        <section className="relative space-y-4 border-t pt-6 pb-10">
            <h2 className="text-center text-lg font-medium tracking-tight text-muted-foreground md:text-xl">
                Built for{' '}
                <span className="text-foreground">maintenance teams</span>
            </h2>
            <div className="relative z-10 mx-auto max-w-4xl">
                <LogoCloud />
            </div>
        </section>
    );
}
