import Head from "next/head";
import Link from "next/link";
import EmptyState, { emptyStateStyles } from "@/components/EmptyState/EmptyState";

export default function ServerError() {
    return (
        <>
            <Head>
                <title>500 – Something went wrong | Cin-Cin</title>
            </Head>
            <EmptyState
                title="500: We dropped the shaker"
                message="Something went wrong while mixing this one. Our bartender is mopping up."
                hint="Give it a moment and try again."
            >
                <button type="button" className={emptyStateStyles.button} onClick={() => window.location.reload()}>
                    Try again 🔄
                </button>
                <Link href="/" className={emptyStateStyles.pill}>Back to the bar</Link>
            </EmptyState>
        </>
    );
}
