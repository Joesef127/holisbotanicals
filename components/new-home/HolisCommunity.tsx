import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../Button';
import { API_BASE } from '../../lib/constants';

const HolisCommunitySection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch(`${API_BASE}/api/subscribers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name: name.trim() || undefined,
                    source: 'Holis Homepage Community',
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to join community. Please try again.');
            }

            setStatus('success');
            setEmail('');
            setName('');
        } catch (err: any) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong. Please check your connection.');
        }
    };

    return (
        <section id="community" className="py-24 bg-background text-text relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-accent blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-6">
                        <Mail className="w-3.5 h-3.5 text-accent" />
                        <span>Botanical Health Insights</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-white">
                        Join the Holis Community
                    </h2>

                    <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Subscribe for science-backed botanical health guides, early product launch notifications, and exclusive subscriber wellness tips delivered straight to your inbox.
                    </p>

                    {status === 'success' ? (
                        <div className="p-8 rounded-3xl bg-white/10 border border-white/20 max-w-lg mx-auto flex items-center gap-4 text-left">
                            <CheckCircle2 className="w-8 h-8 text-accent shrink-0" />
                            <div>
                                <h4 className="font-bold text-lg text-white">You&apos;re in!</h4>
                                <p className="text-sm text-gray-200">
                                    Thank you for joining the Holis Botanicals community. Check your inbox for our latest wellness guides.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Your First Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 text-sm transition-all"
                                    aria-label="Your First Name"
                                />
                                <input
                                    type="email"
                                    required
                                    placeholder="Your Email Address"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === 'error') setStatus('idle');
                                    }}
                                    className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white/15 text-sm transition-all"
                                    aria-label="Your Email Address"
                                />
                            </div>

                            {status === 'error' && errorMessage && (
                                <div className="flex items-center gap-2 text-rose-300 text-xs text-left px-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="secondary"
                                size="lg"
                                fullWidth
                                disabled={status === 'loading'}
                                className="gap-2 text-base font-bold shadow-lg"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Joining...</span>
                                    </>
                                ) : (
                                    <span>Subscribe to the Holis Journal</span>
                                )}
                            </Button>

                            <p className="text-xs text-gray-300 pt-2">
                                We respect your privacy. Unsubscribe at any time with one click.
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default HolisCommunitySection;
