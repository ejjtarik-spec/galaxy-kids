"use client";

import Button from "../../components/ui/Button";
import { signInWithGoogle } from "../../services/firebase/auth";

export default function GoogleLoginButton() {
  return (
    <Button onClick={signInWithGoogle}>
      Commencer
    </Button>
  );
}