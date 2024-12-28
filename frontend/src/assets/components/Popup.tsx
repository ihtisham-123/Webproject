
export default function Popup({ onClose }:any) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
            <div className="bg-[#0A1946] rounded-lg p-6 max-w-sm w-full relative" onClick={(e) => e.stopPropagation()}>
                <button 
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                >
                    <span className="text-xl">×</span>
                </button>
                
                <h2 className="text-2xl font-bold text-primary text-center mb-4">
                    <span role="img" aria-label="Christmas Tree">🎄</span> Exclusive Christmas Offer!
                </h2>
                
                <p className="text-lg text-muted-foreground text-center mb-4">
                    Unwrap Your Trading Success! 🎁
                </p>
                
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center p-4 rounded-lg mb-4">
                    <span className="text-3xl font-bold">50% OFF</span><br />
                    <span className="text-sm">on $50K & $100K Accounts</span>
                </div>
                
                <p className="text-center text-muted-foreground mb-2">Use Either Code:</p>
                
                <div className="flex justify-center space-x-2 mb-4">
                    <button className="bg-secondary text-secondary-foreground p-2 rounded-lg hover:bg-opacity-90 transition-opacity">
                        NEW25DEC
                    </button>
                    <span className="text-muted-foreground flex items-center">OR</span>
                    <button className="bg-secondary text-secondary-foreground p-2 rounded-lg hover:bg-opacity-90 transition-opacity">
                        CHRIS50
                    </button>
                </div>
                
                <p className="text-center text-muted-foreground mb-4">
                    Limited Time Offer! Don't Miss Out! 🎉
                </p>
                
                <button className="bg-primary text-primary-foreground w-full p-2 rounded-lg hover:bg-opacity-90 transition-opacity">
                    Claim Your Christmas Discount 🎅
                </button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                    *Offer valid until 1st January 2025. Terms and conditions apply. Both codes offer 50% OFF on $50K & $100K accounts.
                </p>
            </div>
        </div>
    );
}