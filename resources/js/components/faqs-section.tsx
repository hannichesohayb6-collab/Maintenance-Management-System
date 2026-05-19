import { Link } from '@inertiajs/react';
import React from 'react';
import { SearchIcon, SearchSlashIcon } from 'lucide-react';

import { contact } from '@/routes';
import { cn } from '@/lib/utils';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { FullWidthDivider } from '@/components/ui/full-width-divider';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';

const categories = [
    { id: 'all', label: 'All' },
    { id: 'requests', label: 'Requests' },
    { id: 'technicians', label: 'Technicians' },
    { id: 'admins', label: 'Admins' },
    { id: 'accounts', label: 'Accounts' },
];

const faqs = [
    {
        id: 1,
        category: 'requests',
        title: 'How do residents submit a maintenance request?',
        content:
            'Residents can create an account, sign in, describe the issue, choose a priority, and follow every status update from their dashboard.',
    },
    {
        id: 2,
        category: 'requests',
        title: 'Can users track request progress?',
        content:
            'Yes. Each request keeps a clear lifecycle so users can see pending, assigned, in-progress, and completed updates in one place.',
    },
    {
        id: 3,
        category: 'technicians',
        title: 'How do technicians receive work?',
        content:
            'Technicians can review available requests, send offers, manage assigned tasks, and update the status as work moves forward.',
    },
    {
        id: 4,
        category: 'technicians',
        title: 'Can technicians choose requests by fit?',
        content:
            'Technicians can evaluate request details before offering, helping teams match the right skill set to the right maintenance issue.',
    },
    {
        id: 5,
        category: 'admins',
        title: 'What can administrators manage?',
        content:
            'Administrators can manage users, technicians, request history, and operational visibility across the full maintenance workflow.',
    },
    {
        id: 6,
        category: 'accounts',
        title: 'Who should create an account?',
        content:
            'Residents who want to submit requests and technicians who manage work should use authenticated accounts for the right dashboard access.',
    },
];

export function FaqsSection() {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [activeCategory, setActiveCategory] = React.useState('all');

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory =
            activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch =
            faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.content.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <section className="mx-auto mt-16 w-full max-w-3xl border-y md:border-x">
            <div className="px-4 py-12 lg:px-6">
                <p className="mb-3 text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                    FAQ
                </p>
                <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
                    Frequently asked questions
                </h2>
                <p className="mb-8 max-w-2xl text-muted-foreground">
                    Quick answers about using the maintenance management system
                    as a resident, technician, or admin.
                </p>

                <InputGroup className="max-w-sm bg-card">
                    <InputGroupInput
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search FAQs..."
                        value={searchTerm}
                    />
                    <InputGroupAddon>
                        <SearchIcon data-icon="inline-start" />
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <FullWidthDivider contained />

            <div className="flex flex-wrap gap-1 border-b px-4 md:gap-3">
                {categories.map((category) => (
                    <button
                        className="flex flex-col"
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        type="button"
                    >
                        <span
                            className={cn(
                                'p-1 text-sm text-muted-foreground hover:text-primary md:p-2 md:text-base',
                                activeCategory === category.id &&
                                    'text-primary',
                            )}
                        >
                            {category.label}
                        </span>
                        {activeCategory === category.id && (
                            <span className="h-0.5 w-full rounded-full bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            <Accordion
                className="space-y-2 px-4 py-10 lg:px-6"
                collapsible
                type="single"
            >
                {filteredFaqs.map((faq) => (
                    <AccordionItem
                        className="rounded-lg border px-4 shadow-xs"
                        key={faq.id}
                        value={faq.id.toString()}
                    >
                        <AccordionTrigger className="hover:no-underline">
                            {faq.title}
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4 text-muted-foreground">
                            {faq.content}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
                <Empty className="px-4 pb-10">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <SearchIcon />
                        </EmptyMedia>
                        <EmptyTitle>
                            No FAQs found matching your search.
                        </EmptyTitle>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button
                            onClick={() => setSearchTerm('')}
                            variant="outline"
                        >
                            <SearchSlashIcon data-icon="inline-start" />
                            Clear search
                        </Button>
                    </EmptyContent>
                </Empty>
            )}

            <div className="flex items-center px-4 py-6 lg:px-6">
                <p className="text-muted-foreground">
                    Still need help?{' '}
                    <Link
                        className="text-primary hover:underline"
                        href={contact()}
                    >
                        Contact us
                    </Link>
                </p>
            </div>
        </section>
    );
}
