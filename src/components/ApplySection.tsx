import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const ApplySection = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.event === "Tally.FormSubmitted") {
        setSubmitted(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section id="apply" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Apply to Join <span className="text-gradient-gold">The Ascent Hive</span>
          </h2>
          <p className="text-muted-foreground text-lg">Ready to build something extraordinary? Apply now.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thankyou"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-lg mx-auto text-center gradient-card rounded-2xl p-12 border-glow"
            >
              <h3 className="font-heading text-3xl font-bold text-primary mb-3">
                Thanks for Applying! 🎉
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Welcome to The Ascent Hive! We've received your application. While we review it, we'd love for you to join our WhatsApp community to stay in the loop.
              </p>
              <motion.a
                href="https://chat.whatsapp.com/H9CO4mBUX60BshnvP2U9gI"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 gradient-gold text-primary-foreground px-6 py-3 rounded-xl font-bold glow-button"
              >
                <MessageCircle size={18} />
                Join our WhatsApp Community
              </motion.a>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-2xl mx-auto"
            >
              <iframe
                id="tally-iframe"
                src="https://tally.so/embed/jaW8V4?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="no"
                title="Application Form"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ApplySection;