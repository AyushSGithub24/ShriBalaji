'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signupSchema, SignupInput } from '@/lib/validations';

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  // Initialize the form with Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange'
  });

  // The function that runs when the form is valid and submitted
  const onSubmit = async (data: SignupInput) => {
    setServerError(null); // Clear previous errors

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // If the backend returns an error (like "Email already exists")
        setServerError(result.message || 'Something went wrong');
        return;
      }

      // Success! Redirect the user to the login page
      router.push('/login');
      
    } catch (error) {
      setServerError('Failed to connect to the server. Please try again.');
    }
  };


  return (
    <>
  
      <main
        className="min-h-[calc(100vh-80px)] py-24"
        style={{
          backgroundImage:
            'radial-gradient(circle at top, rgba(54,47,143,0.14), transparent 30%), radial-gradient(circle at bottom left, rgba(239,68,68,0.12), transparent 35%)',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-center">
            <section className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-secondary/80 px-4 py-2 text-sm font-semibold text-secondary-foreground">
                Start a new project
              </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  Create your SBA account
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground">
                  Sign up to request custom signage, track orders, and access dedicated support from Shri Balaji Advertising & Marketing.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm">
                  <p className="text-sm font-semibold text-foreground">Free quote access</p>
                  <p className="mt-2 text-sm text-muted-foreground">Submit your project details for a fast, tailored estimate.</p>
                </div>
                <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm">
                  <p className="text-sm font-semibold text-foreground">Trusted service</p>
                  <p className="mt-2 text-sm text-muted-foreground">Partner with an expert signage team serving Noida and Delhi NCR.</p>
                </div>
              </div>
            </section>

            <Card className="rounded-[1.75rem] border border-border bg-background/90 p-8 shadow-xl">
              <div className="space-y-6">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">Create a new account</CardTitle>
                  <CardDescription>Complete the form below to join the SBA customer portal.</CardDescription>
                </div>

                {/* Display Server Errors (e.g., Email already in use) */}
                {serverError && (
                  <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md">
                    {serverError}
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4">
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-foreground">Full name</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        {...register('name')} // Connect Zod to this input
                        required
                        className={`bg-secondary/70 border-border ${errors.name ? 'border-destructive' : ''}`}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-foreground">Email address</label>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        {...register('email')} // Connect Zod to this input
                        required
                        className={`bg-secondary/70 border-border ${errors.email ? 'border-destructive' : ''}`}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-foreground">Phone number</label>
                      <Input
                        type="tel"
                        placeholder="+91 99999xx999"
                        required
                        {...register('number')}
                        className={`bg-secondary/70 border-border ${errors.number ? 'border-destructive' : ''}`}   />
                      {errors.number && <p className="text-sm text-destructive">{errors.number.message}</p>}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-foreground">Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        required
                        {...register('password')}
                        className={`bg-secondary/70 border-border ${errors.password ? 'border-destructive' : ''}`}
                      />
                      {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>} </div>
                  </div>

                  {/* Disable button while submitting so they don't click it twice */}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                  </Button>
                </form>

                <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                  <Link href="/contact" className="text-sm font-medium text-primary hover:underline">
                    Contact support
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
    </>
  );
}
