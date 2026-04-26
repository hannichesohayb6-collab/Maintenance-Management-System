import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { create as createRequest, index, store } from '@/routes/user/requests';

type CreateRequestForm = {
    title: string;
    description: string;
    location: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
};

export default function CreateMaintenanceRequest() {
    const form = useForm<CreateRequestForm>({
        title: '',
        description: '',
        location: '',
        priority: 'medium',
    });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        form.post(store().url, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Create Request" />

            <div className="space-y-6 p-4">
                <PageHeader
                    title="Create Maintenance Request"
                    description="Submit a new issue for technician review."
                />

                <Card className="max-w-3xl">
                    <CardHeader>
                        <CardTitle>Request Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={form.data.title}
                                    onChange={(event) => form.setData('title', event.target.value)}
                                    placeholder="Leaking sink in kitchen"
                                />
                                {form.errors.title && (
                                    <p className="text-sm text-destructive">{form.errors.title}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={form.data.description}
                                    onChange={(event) => form.setData('description', event.target.value)}
                                    placeholder="Describe the issue in detail..."
                                    rows={5}
                                />
                                {form.errors.description && (
                                    <p className="text-sm text-destructive">{form.errors.description}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={form.data.location}
                                    onChange={(event) => form.setData('location', event.target.value)}
                                    placeholder="Building A, Floor 2, Room 204"
                                />
                                {form.errors.location && (
                                    <p className="text-sm text-destructive">{form.errors.location}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label>Priority</Label>
                                <Select
                                    value={form.data.priority}
                                    onValueChange={(value: CreateRequestForm['priority']) =>
                                        form.setData('priority', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                </Select>
                                {form.errors.priority && (
                                    <p className="text-sm text-destructive">{form.errors.priority}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <Button type="submit" disabled={form.processing}>
                                    Submit Request
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={index()}>Back to Requests</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CreateMaintenanceRequest.layout = {
    breadcrumbs: [
        {
            title: 'My Requests',
            href: index(),
        },
        {
            title: 'Create',
            href: createRequest(),
        },
    ],
};
