'use client'

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, Check } from "lucide-react";

export default function MemberVerification() {
    const [isMember, setIsMember] = useState(false);
    const [email, setEmail] = useState("");
    const [verificationStatus, setVerificationStatus] = useState('idle');

    const handleVerifyEmail = async () => {
        if (!email) {
            alert("Email tidak boleh kosong.");
            return;
        }

        setVerificationStatus('loading');
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (email.toLowerCase() === "member@a.com") {
            setVerificationStatus('verified');
        } else {
            setVerificationStatus('not_found');
        }
    };

    return (
        <div className="space-y-4 rounded-lg border bg-white p-4">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="isMemberCheckbox"
                    checked={isMember}
                    onCheckedChange={(checked) => {
                        setIsMember(Boolean(checked));
                        if (!checked) {
                            setEmail("");
                            setVerificationStatus('idle');
                        }
                    }}
                />
                <Label
                    htmlFor="isMemberCheckbox"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                    Pelanggan adalah Member?
                </Label>
            </div>

            {isMember && (
                <div className="animate-in fade-in-50 space-y-2">
                    <Label htmlFor="emailMember" className="text-sm">Email Member</Label>
                    <div className="flex items-end gap-2">
                        <Input
                            id="emailMember"
                            type="email"
                            placeholder="contoh@email.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (verificationStatus !== 'idle') {
                                    setVerificationStatus('idle');
                                }
                            }}
                            disabled={verificationStatus === 'loading' || verificationStatus === 'verified'}
                        />
                        <Button
                            type="button"
                            onClick={handleVerifyEmail}
                            disabled={!email || verificationStatus === 'loading' || verificationStatus === 'verified'}
                            className={`transition-all duration-300 ${verificationStatus === 'idle' || verificationStatus === 'not_found'
                                    ? "w-10"
                                    : "w-10"
                                }`}
                            size={verificationStatus === 'idle' || verificationStatus === 'not_found' ? 'default' : 'icon'}
                        >
                            {verificationStatus === 'loading' ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Check className="h-5 w-5 text-white" />
                            )}
                        </Button>
                    </div>

                    {verificationStatus === 'verified' && (
                        <p className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle2 size={16} />
                            Email ditemukan.
                        </p>
                    )}
                    {verificationStatus === 'not_found' && (
                        <p className="flex items-center gap-1 text-sm text-red-600">
                            <XCircle size={16} />
                            Email tidak ditemukan.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}