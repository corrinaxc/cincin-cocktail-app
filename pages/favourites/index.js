import FavouriteList from "@/components/FavouriteList/FavouriteList";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Favourites({ onInputChange }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <>
      {status === "authenticated" && (
        <FavouriteList onInputChange={onInputChange} />
      )}
    </>
  );
}
