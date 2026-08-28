"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import "./signupform.css";

export default function SignupForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        username: name,
        email,
        password,
      });

      router.push("/my-courses");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-form">
      <div className="signup-form-container">
        <div className="signup-form-header">
          <h1>Create Your Account</h1>

          <p>
            Join our learning community and start building new
            skills today.
          </p>
        </div>

        <form
          className="signup-form-content"
          onSubmit={handleSubmit}
        >
          <div className="signup-form-field">
            <label htmlFor="signup-name">
              Full Name
            </label>

            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </div>

          <div className="signup-form-field">
            <label htmlFor="signup-email">
              Email Address
            </label>

            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="signup-form-field">
            <label htmlFor="signup-password">
              Password
            </label>

            <div className="signup-form-password">
              <input
                id="signup-password"
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                minLength={8}
                required
              />

              <button
                type="button"
                className="signup-form-password-toggle"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="signup-form-field">
            <label htmlFor="signup-confirm-password">
              Confirm Password
            </label>

            <div className="signup-form-password">
              <input
                id="signup-confirm-password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                minLength={8}
                required
              />

              <button
                type="button"
                className="signup-form-password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p className="signup-form-error">
              {error}
            </p>
          )}

          <label className="signup-form-terms">
            <input type="checkbox" required />

            <span>
              I agree to the{" "}
              <Link href="/terms">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            className="signup-form-submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="signup-form-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="signup-form-google"
        >
          <span>G</span>
          Sign up with Google
        </button>

        <p className="signup-form-login">
          Already have an account?{" "}
          <Link href="/login"
            className="login-form-signup-link">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}