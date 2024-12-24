export default function Widget() {
  return (
      <div className="flex flex-col md:flex-row bg-background p-8">
          {/* Left Section: Contact Info */}
          <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground mt-2">Get in touch with the team.</p>
              
              <div className="flex items-center mt-6">
                  <span className="mr-2 text-secondary">
                      <img alt="email-icon" src="https://openui.fly.dev/openui/24x24.svg?text=✉" />
                  </span>
                  <span className="text-muted-foreground">Email: support@fundedbullfix.com</span>
              </div>

              <div className="flex items-center mt-4">
                  <span className="mr-2 text-secondary">
                      <img alt="support-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🛠" />
                  </span>
                  <span className="text-muted-foreground">Support available 24/5</span>
              </div>
          </div>

          {/* Right Section: Form */}
          <form className="md:w-1/2 bg-card p-6 rounded-lg shadow-lg">
              <div className="mb-6">
                  <label className="block text-muted-foreground" htmlFor="name">Full Name</label>
                  <input className="w-full p-2 border border-border rounded-lg bg-input text-foreground" type="text" id="name" placeholder="Enter your name" required />
              </div>
              <div className="mb-6">
                  <label className="block text-muted-foreground" htmlFor="email">Email Address</label>
                  <input className="w-full p-2 border border-border rounded-lg bg-input text-foreground" type="email" id="email" placeholder="Enter your email" required />
              </div>
              <div className="mb-6">
                  <label className="block text-muted-foreground" htmlFor="phone">Phone Number</label>
                  <input className="w-full p-2 border border-border rounded-lg bg-input text-foreground" type="tel" id="phone" placeholder="Enter your phone number" required />
              </div>
              <div className="mb-6">
                  <label className="block text-muted-foreground" htmlFor="message">Message</label>
                  <textarea className="w-full p-2 border border-border rounded-lg bg-input text-foreground" id="message"  placeholder="Type your message..." required></textarea>
              </div>
              <button className="bg-primary text-primary-foreground w-full py-2 rounded-md shadow-smpx-4  
                        bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] hover:from-[#B22ADF] hover:to-[#3E62DE] 
                        hover:bg-gradient-to-r transition-all duration-200">Submit</button>
          </form>
      </div>
  )
}