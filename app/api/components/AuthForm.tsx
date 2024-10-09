"use client";
import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type VARIANT = "LOGIN" | "REGISTER";

export default function AuthForm() {
  // const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<VARIANT>("LOGIN");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (session?.status === "authenticated") {
  //     router.push("/users");
  //   }
  // }, [session?.status, router]);

  const toogleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong"))
        .finally(() => {
          toast.success("Created");
          setLoading(false);
        });
    }
    if (variant === "LOGIN") {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged In");
            router.push("/users");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              errors={errors}
              id="name"
              label="Name"
              disabled={loading}
              register={register}
            />
          )}
          <Input
            errors={errors}
            id="email"
            type="email"
            label="Email"
            register={register}
            disabled={loading}
          />
          <Input
            disabled={loading}
            errors={errors}
            type="password"
            id="password"
            label="Password"
            register={register}
          />
          <div>
            <Button disabled={loading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>{variant === "LOGIN" ? "New?" : "Already have account?"}</div>
          <div onClick={toogleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
