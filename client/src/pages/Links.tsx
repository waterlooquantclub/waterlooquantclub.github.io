import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "../util/constants";

const Links = () => {
  const links = [
    {
      title: "Join our Discord",
      description: "Connect with the WQC community and stay updated",
      url: SOCIAL_LINKS.DISCORD,
      icon: "💬",
      color: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
    {
      title: "Follow us on Instagram",
      description: "See our latest posts and event highlights",
      url: SOCIAL_LINKS.INSTAGRAM,
      icon: "📸",
      color: "bg-gradient-to-r from-pink-500 to-orange-500",
    },
    {
      title: "Panel Event Registration",
      description: "Register for our upcoming panel event",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSe-Q6akqGsedtXGqWXszJH1C87Kne4fGJAFWh6dL65QEGrDTw/viewform?usp=preview",
      icon: "📝",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      title: "Contact Us",
      description: "Send us an email for any inquiries",
      url: SOCIAL_LINKS.EMAIL,
      icon: "✉️",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-200">
              <img
                src="/logo.png"
                alt="Waterloo Quant Club Logo"
                className="w-full h-full object-contain p-2"
              />
            </div>
          </Link>
          <Link to="/" className="hover:text-purple-400 transition-colors">
            <h1 className="text-2xl font-bold mb-2">Waterloo Quant Club</h1>
          </Link>
          <p className="text-gray-400">Connect with us through these links</p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full p-4 rounded-xl ${link.color} hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{link.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{link.title}</h3>
                  <p className="text-sm text-white/80">{link.description}</p>
                </div>
                <svg
                  className="w-5 h-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">© 2025 Waterloo Quant Club</p>
        </div>
      </div>
    </div>
  );
};

export default Links;
