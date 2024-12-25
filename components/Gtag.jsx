
import Script from 'next/script';

const Gtag = ({ trackingId }) => {
    if (!trackingId) {
        console.warn("Google Analytics tracking ID is missing.");
        return null;
    }

    return (
        <>
            {/* Google Analytics Script */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
                strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${trackingId}');
                `}
            </Script>
        </>
    );
};

export default Gtag;
