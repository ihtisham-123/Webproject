import React from 'react';

export default function Widget() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-background p-20 text-left space-y-6 md:space-y-0 md:space-x-8 max-w-screen-xl mx-auto">
      {/* Left Section: Contact Info */}
      <div className="flex-1 max-w-lg">
        <h2 className="text-4xl font-extrabold text-foreground mb-4 leading-snug">Contact Us</h2>
        <p className="text-muted-foreground mb-10">Get in touch with the team.</p>
        
        <div className="space-y-6">
          <div className="flex items-center">
            <span className="mr-4 text-secondary">
              <img alt="email-icon" src="/api/placeholder/24/24" className="w-6 h-6" />
            </span>
            <span className="text-muted-foreground">Email: support@fundedbullfix.com</span>
          </div>

          <div className="flex items-center">
            <span className="mr-4 text-secondary">
              <img alt="support-icon" src="/api/placeholder/24/24" className="w-6 h-6" />
            </span>
            <span className="text-muted-foreground">Support available 24/5</span>
          </div>
        </div>
      </div>

      {/* Right Section: Form */}
      <div className="flex-1 w-full max-w-lg">
        <form className="bg-card p-8 rounded-lg shadow-lg space-y-6">
          <div>
            <label className="block text-muted-foreground mb-2" htmlFor="name">Full Name</label>
            <input 
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" 
              type="text" 
              id="name" 
              placeholder="Enter your name" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-muted-foreground mb-2" htmlFor="email">Email Address</label>
            <input 
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-muted-foreground mb-2" htmlFor="phone">Phone Number</label>
            <input 
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" 
              type="tel" 
              id="phone" 
              placeholder="Enter your phone number" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-muted-foreground mb-2" htmlFor="message">Message</label>
            <textarea 
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors min-h-[120px]" 
              id="message"  
              placeholder="Type your message..." 
              required
            ></textarea>
          </div>
          
          <button 
            className="w-full py-3 px-6 font-bold rounded-lg shadow-sm
                      bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] 
                      hover:from-[#B22ADF] hover:to-[#3E62DE] 
                      hover:bg-gradient-to-r transition-all duration-200"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}