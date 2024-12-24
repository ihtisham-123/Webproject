export default function Global() {
    const cards = [
        {
            title: "Trustworthy",
            description:
                "Over $300K+ Payouts History; Secured since our launch in August 2023, FundedBullFX has reached a 'TOP PROP FIRM' level by continually listening to our clients' feedback and improving along the way to become a powerhouse of simulated trading.",
            icon: "🛡",
        },
        {
            title: "Smooth Withdrawals",
            description:
                "FundedBullFX is a regulated firm and is bound to initiate withdrawals within 24 hours of receiving the request.",
            icon: "💸",
        },
        {
            title: "Clear Rules",
            description:
                "We have a very clear set of rules that we expect our clients to follow. We do not tolerate any form of cheating or manipulation.",
            icon: "📜",
        },
    ];

    return (
        <section className="bg-background text-foreground p-8 flex flex-col items-center justify-center max-w-screen-xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">What Makes Us Global Different?</h2>
                <p className="text-gray-400">
                    FundedBullFx Global is the best proprietary firm you can find... Here's why:
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6 bg-background/5 backdrop-blur-sm"
                    >
                        <div className="flex items-center mb-6">
                            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-md">
                                <img
                                    alt={`${card.title} icon`}
                                    src={`https://openui.fly.dev/openui/24x24.svg?text=${card.icon}`}
                                    className="w-8 h-8"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-white ml-4">
                                {card.title}
                            </h3>
                        </div>
                        <p className="text-gray-400">{card.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}