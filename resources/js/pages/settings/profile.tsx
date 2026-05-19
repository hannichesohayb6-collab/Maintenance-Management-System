import { Form, Head, Link, usePage, router } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';
import type { Auth } from '@/types/auth';
import { useState } from 'react';

export default function Profile({
    mustVerifyEmail,
    status,
    specializations,
    userSpecializations,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    specializations: { id: number; name: string }[];
    userSpecializations: number[];
}) {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [newSpecName, setNewSpecName] = useState('');
    const [isAddingSpec, setIsAddingSpec] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const addSpecialization = () => {
        if (!newSpecName.trim()) return;

        setIsAddingSpec(true);
        router.post('/technician/specializations', {
            name: newSpecName
        }, {
            onSuccess: () => {
                setNewSpecName('');
                setIsAddingSpec(false);
            },
            onError: () => {
                setIsAddingSpec(false);
            }
        });
    };

    const filteredSpecializations = specializations.filter(spec =>
        spec.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedSpecializations = searchQuery
        ? filteredSpecializations
        : filteredSpecializations.slice(0, 9);

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Profile information"
                    description="Update your full name, email address, and phone number"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Full name</Label>

                                <Input
                                    id="full_name"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.full_name}
                                    name="full_name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />

                                <InputError className="mt-2" message={errors.full_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone number</Label>

                                <Input
                                    id="phone"
                                    type="tel"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.phone}
                                    name="phone"
                                    required
                                    autoComplete="tel"
                                    placeholder="Phone number"
                                />

                                <InputError className="mt-2" message={errors.phone} />
                            </div>

                            {auth.user.role === 'technician' && (
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Specializations</Label>
                                        <Input
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search specializations..."
                                            className="h-8 w-48 text-xs"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {specializations
                                            .filter(spec => userSpecializations.includes(spec.id))
                                            .map(spec => (
                                                <Badge key={spec.id} variant="secondary">
                                                    {spec.name}
                                                </Badge>
                                            ))
                                        }
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                        {displayedSpecializations.map((spec) => (
                                            <div key={spec.id} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={`spec-${spec.id}`}
                                                    name="specializations[]"
                                                    value={spec.id.toString()}
                                                    defaultChecked={userSpecializations.includes(spec.id)}
                                                />
                                                <Label
                                                    htmlFor={`spec-${spec.id}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {spec.name}
                                                </Label>
                                            </div>
                                        ))}
                                        {displayedSpecializations.length === 0 && (
                                            <p className="text-sm text-muted-foreground col-span-full text-center py-2">
                                                No specializations found.
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 pt-2">
                                        <Input
                                            value={newSpecName}
                                            onChange={(e) => setNewSpecName(e.target.value)}
                                            placeholder="Add new specialization..."
                                            className="h-9"
                                        />
                                        <Button
                                            type="button"
                                            onClick={addSpecialization}
                                            disabled={isAddingSpec || !newSpecName.trim()}
                                            className="h-9"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                    <InputError className="mt-2" message={errors.specializations} />
                                </div>
                            )}

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className="-mt-4 text-sm text-muted-foreground">
                                        Your email address is unverified.{' '}
                                        <Link
                                            href={send()}
                                            as="button"
                                            className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                        >
                                            Click here to resend the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Button disabled={processing} data-test="update-profile-button">
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};
