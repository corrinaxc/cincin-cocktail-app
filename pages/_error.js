import Head from "next/head";
import Link from "next/link";
import EmptyState, { emptyStateStyles } from "@/components/EmptyState/EmptyState";

// Fallback for any other error status (pages/404.js and pages/500.js handle those two)
const MESSAGES = {
    400: ["400: That order didn't make sense", "The bartender couldn't read that one. Check the link and try again."],
    401: ["401: Members only", "You'll need to sign in before we can pour this one."],
    403: ["403: Staff only", "Sorry, that's behind the bar – you can't go back there."],
    404: ["404: This glass has gone missing", "We've checked everywhere – this page isn't here."],
};

function ErrorPage({ statusCode }) {
    const [title, message] = MESSAGES[statusCode] ?? [
        statusCode ? `${statusCode}: Spilled everywhere` : "Spilled everywhere",
        "Something went wrong while mixing this one. Our bartender is mopping up.",
    ];

    return (
        <>
            <Head>
                <title>{statusCode ? `${statusCode} – ` : ""}Error | Cin-Cin</title>
            </Head>
            <EmptyState title={title} message={message}>
                {statusCode === 401 ? (
                    <Link href="/login" className={emptyStateStyles.button}>Sign in</Link>
                ) : (
                    <button type="button" className={emptyStateStyles.button} onClick={() => window.location.reload()}>
                        Try again 🔄
                    </button>
                )}
                <Link href="/" className={emptyStateStyles.pill}>Back to the bar</Link>
            </EmptyState>
        </>
    );
}

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default ErrorPage;
