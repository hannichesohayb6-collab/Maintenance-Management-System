import { Head, Link, useForm, router } from '@inertiajs/react';
import type { FormEvent, ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

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

import { X } from 'lucide-react';

type Priority = 'low' | 'medium' | 'high' | 'urgent';

type CreateRequestForm = {
    title: string;
    description: string;
    location: string;
    priority: Priority;
    required_specialization_id: string;
    images: File[];
};

type Props = {
    specializations: {
        id: number;
        name: string;
    }[];
};

export default function CreateMaintenanceRequest({
    specializations,
}: Props) {
    const [previews, setPreviews] = useState<string[]>([]);

    const form = useForm<CreateRequestForm>({
        title: '',
        description: '',
        location: '',
        priority: 'medium',
        required_specialization_id: '',
        images: [],
    });

    useEffect(() => {
        const previewUrls = form.data.images.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviews(previewUrls);

        return () => {
            previewUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [form.data.images]);

    const handleImageChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;

        if (!files) return;

        form.setData('images', [...form.data.images, ...Array.from(files)]);
    };

    const removeImage = (index: number) => {
        const updatedImages = form.data.images.filter(
            (_, i) => i !== index
        );

        form.setData('images', updatedImages);
    };

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData();

        data.append('title', form.data.title);
        data.append('description', form.data.description);
        data.append('location', form.data.location);
        data.append('priority', form.data.priority);

        if (form.data.required_specialization_id) {
            data.append(
                'required_specialization_id',
                form.data.required_specialization_id
            );
        }

        form.data.images.forEach((file, index) => {
            data.append(`images[${index}]`, file);
        });

        router.post(store().url, data, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset();

                setPreviews([]);
            },
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
                        <form
                            onSubmit={submit}
                            className="space-y-6"
                        >
                            {/* Title */}
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>

                                <Input
                                    id="title"
                                    value={form.data.title}
                                    onChange={(event) =>
                                        form.setData(
                                            'title',
                                            event.target.value
                                        )
                                    }
                                    placeholder="Leaking sink in kitchen"
                                />

                                {form.errors.title && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="grid gap-2">
                                <Label htmlFor="description">
                                    Description
                                </Label>

                                <Textarea
                                    id="description"
                                    rows={5}
                                    value={form.data.description}
                                    onChange={(event) =>
                                        form.setData(
                                            'description',
                                            event.target.value
                                        )
                                    }
                                    placeholder="Describe the issue in detail..."
                                />

                                {form.errors.description && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Location */}
                            <div className="grid gap-2">
                                <Label htmlFor="location">
                                    Location
                                </Label>

                                <Input
                                    id="location"
                                    value={form.data.location}
                                    onChange={(event) =>
                                        form.setData(
                                            'location',
                                            event.target.value
                                        )
                                    }
                                    placeholder="Building A, Floor 2, Room 204"
                                />

                                {form.errors.location && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.location}
                                    </p>
                                )}
                            </div>

                            {/* Priority */}
                            <div className="grid gap-2">
                                <Label>Priority</Label>

                                <Select
                                    value={form.data.priority}
                                    onValueChange={(value: Priority) =>
                                        form.setData(
                                            'priority',
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="low">
                                            Low
                                        </SelectItem>

                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>

                                        <SelectItem value="high">
                                            High
                                        </SelectItem>

                                        <SelectItem value="urgent">
                                            Urgent
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {form.errors.priority && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.priority}
                                    </p>
                                )}
                            </div>

                            {/* Specialization */}
                            <div className="grid gap-2">
                                <Label htmlFor="required_specialization_id">
                                    Specialization (Optional)
                                </Label>

                                <Select
                                    value={
                                        form.data
                                            .required_specialization_id
                                    }
                                    onValueChange={(value) =>
                                        form.setData(
                                            'required_specialization_id',
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select required specialization" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {specializations.map((spec) => (
                                            <SelectItem
                                                key={spec.id}
                                                value={spec.id.toString()}
                                            >
                                                {spec.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {form.errors
                                    .required_specialization_id && (
                                    <p className="text-sm text-destructive">
                                        {
                                            form.errors
                                                .required_specialization_id
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Images */}
                            <div className="grid gap-4">
                                <Label>Images</Label>

                                <Input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="cursor-pointer"
                                />

                                {previews.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                        {previews.map((url, index) => (
                                            <div
                                                key={index}
                                                className="group relative aspect-square"
                                            >
                                                <img
                                                    src={url}
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-full w-full rounded-md border object-cover"
                                                />

                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {form.errors.images && (
                                    <p className="text-sm text-destructive">
                                        {form.errors.images}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-2">
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing
                                        ? 'Submitting...'
                                        : 'Submit Request'}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                >
                                    <Link href={index()}>
                                        Back to Requests
                                    </Link>
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