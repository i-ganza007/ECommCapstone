"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarIcon, Eye, EyeOff } from "lucide-react"

import { parseIsoDate, toIsoDate, yearsBetween } from "@/lib/date"
import { useSessionStore } from "@/store/session"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Wordmark from "@/uicomps/Wordmark"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"

/** Youngest age allowed to hold an account. Assumed — no policy in the project says. */
const MINIMUM_AGE = 18

/** How far back the year dropdown reaches. */
const EARLIEST_YEAR = 1920

const NAMES = ["firstName", "lastName", "email", "password", "dob"] as const
type FieldName = (typeof NAMES)[number]
type Errors = Partial<Record<FieldName, string>>

/**
 * Sign-up form.
 *
 * ⚠️ No account is created. The project has no backend, so this validates the
 * details, records the email in the session store the same way sign-in does,
 * and sends the visitor to the shop. The password is never read, stored or
 * checked — see the warning at the top of store/session.ts.
 */
export default function SignupForm() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [errors, setErrors] = React.useState<Errors>({})

    // Date of birth is the one controlled field: the text box and the calendar
    // are two ways of editing the same value, so it cannot live in the DOM.
    const [dob, setDob] = React.useState("")
    const [calendarOpen, setCalendarOpen] = React.useState(false)

    const router = useRouter()
    const signUp = useSessionStore((state) => state.signUp)

    const selectedDob = parseIsoDate(dob)
    const age = selectedDob ? yearsBetween(selectedDob, new Date()) : undefined

    function validate(values: Record<FieldName, string>): Errors {
        const next: Errors = {}

        if (!values.firstName.trim()) next.firstName = "Enter your first name."
        if (!values.lastName.trim()) next.lastName = "Enter your last name."

        // Deliberately loose: the only address that can be proven real is one
        // that receives mail, and there is nothing here to send any.
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
            next.email = "Enter an email address, e.g. you@example.com."

        if (values.password.length < 8)
            next.password = "Use at least 8 characters."

        const birthday = parseIsoDate(values.dob)
        const today = new Date()

        if (!values.dob.trim()) next.dob = "Enter your date of birth."
        else if (!birthday) next.dob = "Use the format YYYY-MM-DD, e.g. 1998-04-23."
        else if (birthday > today) next.dob = "That date is in the future."
        else if (yearsBetween(birthday, today) < MINIMUM_AGE)
            next.dob = `You must be ${MINIMUM_AGE} or over to open an account.`

        return next
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const values = Object.fromEntries(
            NAMES.map((name) => [name, String(data.get(name) ?? "")]),
        ) as Record<FieldName, string>

        const found = validate(values)
        setErrors(found)
        if (Object.keys(found).length > 0) return

        // Kept in the session store so the profile page has something true to
        // show. The password is not among them and never will be.
        signUp({
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            email: values.email.trim(),
            dob: values.dob.trim(),
        })
        router.push("/profile")
    }

    return (
        <div className="flex w-full max-w-md flex-col bg-white px-10 py-14 sm:px-16">
            {/* Same lockup and ink as the sign-in card — the two pages are one
                pair and a visitor moves between them. */}
            <div className="flex justify-center text-neutral-900">
                <Wordmark variant="stacked" size="md" descriptor="skincare" />
            </div>

            <div className="mt-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
                    Create an account
                </h1>
                <p className="mt-3 text-[15px] text-neutral-800">
                    A few details and you are in
                </p>
            </div>

            {/* noValidate: the messages below are the ones people see, so the
                browser's own bubbles would only ever be a second opinion. */}
            <form className="mt-10" onSubmit={handleSubmit} noValidate>
                <FieldGroup>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <Field data-invalid={!!errors.firstName}>
                            <FieldLabel htmlFor="signup-first-name">First name</FieldLabel>
                            <Input
                                id="signup-first-name"
                                name="firstName"
                                autoComplete="given-name"
                                placeholder="Ada"
                                aria-invalid={!!errors.firstName}
                            />
                            <FieldError>{errors.firstName}</FieldError>
                        </Field>

                        <Field data-invalid={!!errors.lastName}>
                            <FieldLabel htmlFor="signup-last-name">Last name</FieldLabel>
                            <Input
                                id="signup-last-name"
                                name="lastName"
                                autoComplete="family-name"
                                placeholder="Lovelace"
                                aria-invalid={!!errors.lastName}
                            />
                            <FieldError>{errors.lastName}</FieldError>
                        </Field>
                    </div>

                    <Field data-invalid={!!errors.email}>
                        <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                        <Input
                            id="signup-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            aria-invalid={!!errors.email}
                        />
                        <FieldError>{errors.email}</FieldError>
                    </Field>

                    <Field data-invalid={!!errors.password}>
                        <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                        <div className="relative">
                            <Input
                                id="signup-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="At least 8 characters"
                                aria-invalid={!!errors.password}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((shown) => !shown)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                aria-pressed={showPassword}
                                className="absolute inset-y-0 right-0 grid w-10 place-items-center rounded-md text-neutral-600 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
                            >
                                {showPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        </div>
                        <FieldError>{errors.password}</FieldError>
                    </Field>

                    {/* Age is asked for as a date of birth: it is the answer that
                        stays true tomorrow, and the number is shown back below. */}
                    <Field data-invalid={!!errors.dob}>
                        <FieldLabel htmlFor="signup-dob">Date of birth</FieldLabel>

                        <div className="relative">
                            <Input
                                id="signup-dob"
                                name="dob"
                                value={dob}
                                onChange={(event) => setDob(event.target.value)}
                                placeholder="YYYY-MM-DD"
                                autoComplete="bday"
                                aria-invalid={!!errors.dob}
                                aria-describedby="signup-age"
                                className="pr-10"
                            />

                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                                {/* type="button" is explicit: this trigger sits
                                    inside a form, and a submit button here would
                                    send it on the way to the calendar. */}
                                <PopoverTrigger
                                    type="button"
                                    aria-label="Pick a date of birth"
                                    className="absolute inset-y-0 right-0 grid w-10 place-items-center rounded-md text-neutral-600 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
                                >
                                    <CalendarIcon className="size-4" />
                                </PopoverTrigger>

                                <PopoverContent align="end" className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDob}
                                        // Month and year dropdowns: nobody should
                                        // page back three hundred months by hand.
                                        captionLayout="dropdown"
                                        startMonth={new Date(EARLIEST_YEAR, 0)}
                                        endMonth={new Date()}
                                        defaultMonth={
                                            selectedDob ??
                                            new Date(
                                                new Date().getFullYear() - MINIMUM_AGE,
                                                0,
                                            )
                                        }
                                        disabled={{ after: new Date() }}
                                        autoFocus
                                        onSelect={(date) => {
                                            if (!date) return
                                            setDob(toIsoDate(date))
                                            // A date picked from the calendar can
                                            // never be the one just complained about.
                                            setErrors((current) => {
                                                if (!current.dob) return current
                                                const next = { ...current }
                                                delete next.dob
                                                return next
                                            })
                                            setCalendarOpen(false)
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Live region: the age changes without the field moving. */}
                        <FieldDescription id="signup-age" aria-live="polite">
                            {age === undefined
                                ? "Type the date or pick it from the calendar."
                                : `That makes you ${age} year${age === 1 ? "" : "s"} old.`}
                        </FieldDescription>

                        <FieldError>{errors.dob}</FieldError>
                    </Field>
                </FieldGroup>

                <Button
                    type="submit"
                    className="mt-9 h-14 w-full rounded-full text-[15px] font-semibold"
                >
                    Create account
                </Button>
            </form>

            <p className="pt-10 text-center text-[13px] text-neutral-900">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold hover:underline">
                    Log In
                </Link>
            </p>
        </div>
    )
}
