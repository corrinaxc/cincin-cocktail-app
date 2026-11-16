import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Returns the signed-in user's id, or sends a 401 and returns null.
// Always use this id on the server instead of one sent by the browser.
export async function requireUserId(request, response) {
    const session = await getServerSession(request, response, authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        response.status(401).json({ error: "You need to be signed in." });
        return null;
    }
    return userId;
}
