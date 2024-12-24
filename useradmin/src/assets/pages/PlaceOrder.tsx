import React, { useState } from 'react';

export default function PlaceOrder() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        challengeType: '',
        accountSize: '',
        platform: '',
        couponCode: '',
        transactionId: '',
        paymentProof: null
    });

    const [total, setTotal] = useState(0);

    // Options for dropdowns
    const challengeTypes = [
        { value: 'standard', label: 'Standard Challenge', price: 100 },
        { value: 'aggressive', label: 'Aggressive Challenge', price: 150 },
        { value: 'expert', label: 'Expert Challenge', price: 200 }
    ];

    const accountSizes = [
        { value: '5k', label: '$5,000', price: 50 },
        { value: '10k', label: '$10,000', price: 100 },
        { value: '25k', label: '$25,000', price: 250 },
        { value: '50k', label: '$50,000', price: 500 }
    ];

    const platforms = [
        { value: 'mt4', label: 'MetaTrader 4' },
        { value: 'mt5', label: 'MetaTrader 5' },
        { value: 'ctrader', label: 'cTrader' }
    ];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Update total when challenge type or account size changes
        if (id === 'challengeType' || id === 'accountSize') {
            calculateTotal(id === 'challengeType' ? value : formData.challengeType, 
                         id === 'accountSize' ? value : formData.accountSize);
        }
    };

    const calculateTotal = (challengeType, accountSize) => {
        const challengePrice = challengeTypes.find(c => c.value === challengeType)?.price || 0;
        const sizePrice = accountSizes.find(s => s.value === accountSize)?.price || 0;
        setTotal(challengePrice + sizePrice);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            paymentProof: file
        }));
    };

    return (
        <div className="bg-background p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-4">Order Your Challenge</h1>
            <button className="bg-primary text-primary-foreground p-2 rounded-lg mb-4 w-full hover:bg-primary/90 transition-colors">
                Pay with CoinPayments
            </button>
            <p className="text-muted-foreground mb-4 text-center">or with <strong>Binance</strong></p>
            
            <form className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-muted-foreground mb-1">Username*</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={formData.username}
                        onChange={handleInputChange}
                        className="border border-border rounded-lg p-2 w-full focus:ring-2 focus:ring-primary/20 transition-all" 
                        placeholder="ALPerera" 
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-muted-foreground mb-1">Email*</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border border-border rounded-lg p-2 w-full focus:ring-2 focus:ring-primary/20 transition-all" 
                        placeholder="sarahhk123@gmail.com" 
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="challengeType" className="block text-muted-foreground mb-1">Challenge Type*</label>
                    <select 
                        id="challengeType" 
                        value={formData.challengeType}
                        onChange={handleInputChange}
                        className="border border-border rounded-lg p-2 w-full focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                        <option value="">Select Challenge</option>
                        {challengeTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label} (${type.price})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="accountSize" className="block text-muted-foreground mb-1">Account Size*</label>
                    <select 
                        id="accountSize" 
                        value={formData.accountSize}
                        onChange={handleInputChange}
                        className="border border-border rounded-lg p-2 w-full focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                        <option value="">Select Size</option>
                        {accountSizes.map(size => (
                            <option key={size.value} value={size.value}>
                                {size.label} (${size.price})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="platform" className="block text-muted-foreground mb-1">Platform*</label>
                    <select 
                        id="platform" 
                        value={formData.platform}
                        onChange={handleInputChange}
                        className="border border-border rounded-lg p-2 w-full focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                        <option value="">Select Platform</option>
                        {platforms.map(platform => (
                            <option key={platform.value} value={platform.value}>
                                {platform.label}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label htmlFor="couponCode" className="block text-muted-foreground mb-1">Coupon Code</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            id="couponCode" 
                            value={formData.couponCode}
                            onChange={handleInputChange}
                            className="border border-border rounded-lg p-2 flex-grow focus:ring-2 focus:ring-primary/20 transition-all" 
                            placeholder="Enter coupon code" 
                        />
                        <button 
                            type="button" 
                            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="transactionId" className="block text-muted-foreground mb-1">Your Transaction ID*</label>
                    <input 
                        type="text" 
                        id="transactionId" 
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        className="border border-border rounded-lg p-2 w-full focus:ring-2 focus:ring-primary/20 transition-all" 
                        placeholder="Enter your Transaction Id" 
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="paymentProof" className="block text-muted-foreground mb-1">
                        Payment Proof Image/screenshot (Txid must be Visible)
                    </label>
                    <input 
                        type="file" 
                        id="paymentProof" 
                        onChange={handleFileChange}
                        className="border border-border rounded-lg p-2 w-full focus:ring-2 focus:ring-primary/20 transition-all" 
                    />
                </div>
                
                <div className="pt-4 border-t border-border">
                    <p className="text-muted-foreground text-lg">
                        Total: <strong className="text-foreground">${total}</strong>
                    </p>
                </div>
                
                <button 
                    type="submit" 
                    className="bg-primary text-primary-foreground p-2 rounded-lg w-full hover:bg-primary/90 transition-colors"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
}