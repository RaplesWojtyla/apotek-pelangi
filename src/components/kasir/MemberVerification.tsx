'use client'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle, Check } from "lucide-react"
import { findUserByEmail, VerifiedMember } from "@/action/kasir/user.action"
import toast from "react-hot-toast"

interface MemberVerificationProps {
    onVerify: (member: VerifiedMember | null) => void
}


export default function MemberVerification({ onVerify }: MemberVerificationProps) {
    const [isMember, setIsMember] = useState(false)
    const [email, setEmail] = useState("")
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'not_found' | 'verified'>('idle')

    const handleVerifyEmail = async () => {
        if (!email) {
            toast.error("Email tidak boleh kosong!")
            return
        }

        setVerificationStatus('loading')
        const res = await findUserByEmail(email)

        if (res.success && res.data) {
            setVerificationStatus('verified')
            toast.success(`Member ditemukan: ${res.data.nama}`)
            onVerify(res.data)
        } else {
            setVerificationStatus('not_found')
            toast.error(res.message || "Member tidak ditemukan!")
            onVerify(null)
        }
    }

    const handleCheckboxChange = (checked: boolean) => {
        setIsMember(checked)

        if (!checked) {
            setEmail("")
            setVerificationStatus('idle')
            onVerify(null)
        }
    }

    return (
        <div className="space-y-4 rounded-lg border bg-white p-4">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="isMemberCheckbox"
                    checked={isMember}
                    onCheckedChange={(c) => handleCheckboxChange(Boolean(c))}
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
                                setEmail(e.target.value)

                                if (verificationStatus !== 'idle') {
                                    setVerificationStatus('idle')
                                    onVerify(null)
                                }
                            }}
                            disabled={verificationStatus === 'loading' || verificationStatus === 'verified'}
                        />
                        <Button
                            type="button"
                            onClick={handleVerifyEmail}
                            disabled={!email || verificationStatus === 'loading' || verificationStatus === 'verified'}
                            className={`transition-all duration-300 w-24`}
                            size={'default'}
                        >
                            {verificationStatus === 'loading' ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : verificationStatus === 'verified' ? (
                                <CheckCircle2 className="h-5 w-5" />
                            ) : (
                                "Verifikasi"
                            )}
                        </Button>
                    </div>

                    {verificationStatus === 'verified' && (
                        <p className="flex items-center gap-1 text-sm text-green-600">
                            <CheckCircle2 size={16} />
                            Member terverifikasi.
                        </p>
                    )}

                    {verificationStatus === 'not_found' && (
                        <p className="flex items-center gap-1 text-sm text-red-600">
                            <XCircle size={16} />
                            Member tidak ditemukan.
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}