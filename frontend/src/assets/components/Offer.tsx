export default function Offer() {
    return (
        <section className="bg-background text-foreground p-8 flex flex-col items-center justify-center max-w-screen-xl mx-auto">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">What do we offer?</h2>
                <p className="mb-8 text-muted-foreground">
                    Funded Bull FX, not only can traders showcase their skills and earn commissions through our paper trading program, but we also offer an attractive{" "}
                    <strong className="text-primary">REFERRAL BONUS</strong>. When you refer a friend or colleague to join our platform, you'll receive 15% of their first purchase as a bonus. This is a great way to boost your earnings while sharing the opportunity with fellow traders. Our referral program is designed to reward you for helping others discover the potential of our prop trading business.
                </p>
                <button className="px-6 py-3 font-bold rounded-md shadow-sm
                    bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] 
                    hover:from-[#B22ADF] hover:to-[#3E62DE] 
                    text-primary-foreground
                    transition-all duration-200">
                    Get Funded
                </button>
            </div>
        </section>
    );
}