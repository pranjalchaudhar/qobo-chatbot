import Knowledge from "./contentModel.js";

export const scrapeWebsite = async () => {
  console.log("Saving structured website data...");

  await Knowledge.deleteMany({});

  const data = [

    // ---------------- FEATURES ----------------
    {
      category: "features",
      question: "What kind of digital presence does Qobo provide?",
      answer: `Qobo provides a complete digital ecosystem:

• Professional websites
• React Native mobile applications
• Scalable web apps
• AI-powered automation systems
• Platforms designed for business growth`,

      keywords: ["digital", "presence", "website", "mobile", "app"]
    },

    {
      category: "features",
      question: "Does Qobo support WhatsApp native management?",
      answer: `Yes, Qobo operates directly through WhatsApp:

• Website creation happens in chat
• Order management inside WhatsApp
• Delivery tracking via chat
• Automated confirmations
• No external dashboards required`,

      keywords: ["whatsapp", "management", "orders"]
    },

    {
      category: "features",
      question: "Does Qobo support instant deployment?",
      answer: `Yes, Qobo ensures fast deployment:

• Real-time hosting included
• Shareable live URLs generated instantly
• Go from concept to live website in minutes
• Secure infrastructure
• Fully managed backend`,

      keywords: ["deployment", "hosting", "live", "url"]
    },

    {
      category: "features",
      question: "Does Qobo support multiple languages?",
      answer: `Yes, Qobo supports multilingual businesses:

• English language support
• Indian regional languages
• Better local customer engagement
• Wider geographic reach
• Improved brand accessibility`,

      keywords: ["language", "local", "indian"]
    },

    {
      category: "features",
      question: "What industries does Qobo support?",
      answer: `Qobo supports multiple industries:

• Ecommerce businesses
• Portfolio websites
• Mobile applications
• AI automation systems
• AI agents and business tools`,

      keywords: ["industries", "ecommerce", "portfolio", "mobile"]
    },

    // ---------------- BENEFITS ----------------
    {
      category: "benefits",
      question: "What are the benefits of building with Qobo?",
      answer: `Building with Qobo offers major advantages:

• Visibility on Google Maps & Search
• Payments go directly to your bank
• WhatsApp automated order receipts
• No coding required
• Rapid business digitization`,

      keywords: ["benefits", "google", "maps", "payment"]
    },

    // ---------------- FAQ ----------------
    {
      category: "faq",
      question: "How do I start building my website?",
      answer: `Getting started is simple:

• Message Qobo on WhatsApp at +91 99016 31188
• Describe your business idea
• AI guides you step-by-step
• No signup required
• No credit card needed`,

      keywords: ["start", "whatsapp", "build"]
    },

    {
      category: "faq",
      question: "Can I integrate payment gateways?",
      answer: `Yes, Qobo supports secure payment integration:

• UPI and card payments
• Ecommerce checkout systems
• Direct bank transfers
• Secure encrypted transactions
• Full payment tracking`,

      keywords: ["payment", "gateway"]
    },

    // ---------------- SUCCESS STORY ----------------
    {
      category: "success_stories",
      question: "Tell me about Sonia's Fashion Store success story.",
      answer: `Sonia Mehta’s success with Qobo:

• Converted Instagram shop into full ecommerce store
• Website launched in minutes
• Payments automated
• Orders handled via WhatsApp
• Sales increased by 40%`,

      keywords: ["sonia", "fashion", "success"]
    },

    // ---------------- CONTACT ----------------
    {
      category: "contact",
      question: "How can I contact Qobo?",
      answer: `You can contact Qobo through:

• Email: hello@qobo.dev
• Phone: +91 9901141616
• WhatsApp support available
• Direct chat-based assistance
• Quick response support system`,

      keywords: ["contact", "email", "phone"]
    },

    {
      category: "about",
      question: "What is Qobo's mission?",
      answer: `Qobo’s mission is simple:

• Empower entrepreneurs digitally
• Remove technical barriers
• Simplify website creation
• Operate entirely via WhatsApp
• Make online growth accessible to everyone`,

      keywords: ["mission", "about", "empower"]
    }

  ];

  await Knowledge.insertMany(data);

  console.log("Website knowledge saved successfully.");
};