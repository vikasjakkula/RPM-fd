import { Link } from "react-router-dom";
import { Activity, Shield, Zap, Heart, ArrowRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

const Home = () => {
  return (
    <div className="page-panel">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

        <div className="container mx-auto px-6 text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 max-w-2xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8">
                <Activity size={16} />
                REAL-TIME PATIENT MONITORING
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-8">
                The Future of <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent italic">Intelligent Care</span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                Empowering healthcare with real-time IoT vital monitoring and automated emergency response workflows. Safety, speed, and precision in every heartbeat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/predict" className="btn btn-primary !py-4 !px-8 text-lg group">
                  Start Analysis
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/dashboard" className="btn !bg-white/5 !border !border-white/10 text-white !py-4 !px-8 text-lg hover:!bg-white/10">
                  Live Dashboard
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <div className="flex-1 relative">
            <ScrollReveal>
              <div className="glass-card !p-2 relative z-10 animate-float">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop"
                  alt="Medical Tech"
                  className="rounded-2xl shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute -bottom-6 -left-6 glass-card !p-6 flex items-center gap-4 bg-black/60">
                  <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                    <Heart size={24} className="animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Live Status</p>
                    <p className="text-white font-bold">72 BPM (Stable)</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Powerful Core Capabilities</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Our agent is designed to reduce response times and increase patient safety through high-frequency monitoring.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Activity className="text-blue-400" />,
              title: "IoT Vitals Sync",
              desc: "Continuous real-time synchronization with patient wearable devices."
            },
            {
              icon: <Shield className="text-purple-400" />,
              title: "Smart Alerts",
              desc: "Intelligent threshold detection based on personalized history."
            },
            {
              icon: <Zap className="text-orange-400" />,
              title: "Instant Response",
              desc: "Automated emergency workflows triggered in milliseconds."
            },
            {
              icon: <Heart className="text-red-400" />,
              title: "Risk Prediction",
              desc: "ML-driven heart health indexing out of 100% stability."
            }
          ].map((f, i) => (
            <ScrollReveal key={i}>
              <div className="glass-card group h-full">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="glass-card !bg-blue-600/5 !border-blue-500/20 text-center py-16">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to prioritize patient outcomes?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">Join the next generation of remote healthcare management systems powered by intelligent IoT agents.</p>
          <Link to="/predict" className="btn btn-primary !px-12 !py-4 text-lg">
            Deploy Monitoring Agent
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
