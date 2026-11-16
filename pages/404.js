import Head from "next/head";
import Link from "next/link";
import EmptyState, { emptyStateStyles } from "@/components/EmptyState/EmptyState";

export default function NotFound() {
    return (
        <>
            <Head>
                <title>404 – Page not found | Cin-Cin</title>
            </Head>
            <EmptyState
                title="404: This glass has gone missing"
                message="We've checked behind the bar, under the stools and in the ice bucket – this page isn't here."
                hint="Maybe it was never on the menu, or someone's already drunk it."
            >
                <Link href="/" className={emptyStateStyles.button}>Back to the bar 🍸</Link>
            </EmptyState>
        </>
    );
}
