"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import "./loginform.css";

export default function LoginForm() {
  const router = useRouter();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login({
        identifier: email,
        password,
      });

      const role = user.role?.name;

      if (role === "Instructor") {
        router.push("/instructor");
        return;
      }

      if (role === "Student") {
        router.push("/my-courses");
        return;
      }

      if (role === "Content Manager") {
        router.push("/content-manager");
        return;
      }

      setError(
        "Your account does not have a supported role."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-form">
      <div className="login-form-container">
        <div className="login-form-header">
          <h1>Welcome Back</h1>

          <p>
            Sign in to continue learning and track your
            progress.
          </p>
        </div>

        <form
          className="login-form-content"
          onSubmit={handleSubmit}
        >
          <div className="login-form-field">
            <label htmlFor="login-email">
              Email Address
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="login-form-field">
            <div className="login-form-password-header">
              <label htmlFor="login-password">
                Password
              </label>

              <Link
                href="/forgot-password"
                className="login-form-forgot"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="login-form-password">
              <input
                id="login-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />

              <button
                type="button"
                className="login-form-password-toggle"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <label className="login-form-remember">
            <input type="checkbox" />

            <span>Remember me</span>
          </label>

          {error && (
            <p className="login-form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-form-submit"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        <div className="login-form-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="login-form-google"
        >
          <span>G</span>
          Continue with Google
        </button>

        <p className="login-form-signup">
          Do not have an account?{" "}
          <Link
            href="/signup"
            className="login-form-signup-link"
          >
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}